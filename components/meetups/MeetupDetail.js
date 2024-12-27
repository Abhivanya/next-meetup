import Style from "./MeetupDetail.module.css";

const MeetupDetail = ({ meetupData }) => {
  if (!meetupData) return <p>Meetup Does't Exists</p>;
  return (
    <div className={Style.meetup}>
      <img src={meetupData.image} />
      <h1>{meetupData.title}</h1>
      <p>{meetupData.address}</p>
      <p>{meetupData.description}</p>
    </div>
  );
};

export default MeetupDetail;
