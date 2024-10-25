import Wrapper from '../assets/wrappers/Team';
import moment from 'moment';
import TeamInfo from './TeamInfo';
import { FaCalendarAlt } from 'react-icons/fa';

const Team = ({ _id, team, createdAt, status, quizNum }) => {
  const date = moment(createdAt).format('MMM Do, YYYY');
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{quizNum}</div>
        <div className="info">
          <h5>{team}</h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <TeamInfo icon={<FaCalendarAlt />} text={date} />
          <div className={`status ${status}`}>{status}</div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Team;
