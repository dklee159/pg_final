import { useEffect, useState } from "react";
import { Logo, QuizSelectBox } from "../../components";
import Wrapper from "../../assets/wrappers/Quiz";
import LoadingWrapper from "../../assets/wrappers/LoadingWrapper";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import QuizQuestion from "../../components/QuizQuestion";
import QuizRadioRow from "../../components/QuizRadioRow";
import { createTeam } from "../../features/team/teamSlice";
import Answers from "../../assets/quizzes/Answers";
import { getAllTeams } from "../../features/allTeams/allTeamsSlice";
import Loading from "../../components/Loading";
import { closeModal, openModal } from "../../features/modal/modalSlice";

const initialState = {
  status: "",
  checked: "",
  Answer1: "",
  Answer2: "",
  Answer3: "",
  Answer4: "",
  Answer5: "",
  teamId: "",
};

const Quiz = () => {
  const [values, setValues] = useState(initialState);
  const { player } = useSelector((store) => store.player);
  const { whole, isLoading } = useSelector((store) => store.allTeams);
  const { quizNum } = useParams();
  const { isOpen } = useSelector((store) => store.modal);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllTeams());
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const selectChange = (e) => {
    setValues({ ...values, checked: e.target.value });
  };

  function scoredQuestion(answer1, answer2, answer3, answer4, answer5) {
    const comparison = Answers[parseInt(quizNum) - 1];

    if (quizNum <= 15) {
      if (parseInt(answer1) === comparison) return true;
      return false;
    } else {
      if (answer1 === comparison[0] && answer2 === comparison[1] && answer3 === comparison[2] && answer4 === comparison[3] && answer5 === comparison[4]) {
        return true;
      }
      return false;
    }
  }

  const submitAnswer = () => {
    try {
      const isEdit = whole.find((teamData) => teamData.team === player.team && teamData.quizNum === quizNum);
      let { status } = values;
      if (quizNum <= 15) {
        //객관식
        if (!values.checked) {
          toast.error("Please choose the answer");
          return;
        }
        status = scoredQuestion(values.checked) ? "correct" : "wrong";
      } else {
        // 주관식
        if (!values.Answer1 || !values.Answer2 || !values.Answer3 || !values.Answer4 || !values.Answer5) {
          toast.error("Please fill out all fields");
          return;
        }
        status = scoredQuestion(values.Answer1, values.Answer2, values.Answer3, values.Answer4, values.Answer5) ? "correct" : "wrong";
      }

      if (isEdit) {
        // const teamId = isEdit._id;
        // dispatch(editTeam({ teamId: teamId, team: { status } }));
        toast.error("You already submitted.");
        navigate(`/submitted`);
      } else {
        const team = player.team;
        dispatch(createTeam({ team, status, quizNum }));
        navigate(`/submitpage`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!player) {
      toast.error("Logged in team is not valid. Try again");
      navigate("/denied");
    }
    // if (quizNum <= 15) {
    //   //객관식
    //   if (!values.checked) {
    //     toast.error("Please choose the answer");
    //     return;
    //   }
    // }
  };

  if (isLoading) {
    return (
      <LoadingWrapper className="full-page">
        <Loading />
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper className="full-page bg">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <hr />
        <QuizQuestion type="question" quizNum={quizNum} />
        {parseInt(quizNum) - 1 < 15 ? (
          <>
            <QuizRadioRow type="radio" quizNum={quizNum} value="1" handleChange={selectChange} checked={values.checked} />
            <QuizRadioRow type="radio" quizNum={quizNum} value="2" handleChange={selectChange} checked={values.checked} />
            <QuizRadioRow type="radio" quizNum={quizNum} value="3" handleChange={selectChange} checked={values.checked} />
            <QuizRadioRow type="radio" quizNum={quizNum} value="4" handleChange={selectChange} checked={values.checked} />
          </>
        ) : (
          <>
            <QuizSelectBox name="Answer1" quizNum={quizNum} example="1" value={values.Answer1} handleChange={handleChange} />
            <QuizSelectBox name="Answer2" quizNum={quizNum} example="2" value={values.Answer2} handleChange={handleChange} />
            <QuizSelectBox name="Answer3" quizNum={quizNum} example="3" value={values.Answer3} handleChange={handleChange} />
            <QuizSelectBox name="Answer4" quizNum={quizNum} example="4" value={values.Answer4} handleChange={handleChange} />
            <QuizSelectBox name="Answer5" quizNum={quizNum} example="5" value={values.Answer5} handleChange={handleChange} />
          </>
        )}
        <button
          type="btn"
          className="btn btn-block submit-btn"
          disabled={isLoading}
          onClick={() => {
            if (quizNum <= 15) {
              values.checked && dispatch(openModal());
            } else {
              values.Answer1 && values.Answer2 && values.Answer3 && values.Answer4 && values.Answer5 && dispatch(openModal());
            }
          }}
        >
          {isLoading ? "loading..." : "submit"}
        </button>
      </form>
      {isOpen && (
        <aside className="modal-container">
          <div className="modal">
            <h4>Only one entry per team is allowed. You will not be able to go back and edit/check your response. </h4>
            <h4>Are you sure to proceed and submit?</h4>
            <div className="btn-container">
              <button
                type="button"
                className="modal-btn confirm-btn"
                onClick={() => {
                  submitAnswer();
                  dispatch(closeModal());
                }}
              >
                Yes
              </button>
              <button
                type="button"
                className="modal-btn clear-btn"
                onClick={() => {
                  dispatch(closeModal());
                }}
              >
                No
              </button>
            </div>
          </div>
        </aside>
      )}
    </Wrapper>
  );
};
export default Quiz;
