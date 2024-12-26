import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const AddMeetupPage = () => {
  const handleAddMeetup = (newMeetup) => {
    console.log(newMeetup);
  };
  return <NewMeetupForm onAddMeetup={handleAddMeetup} />;
};

export default AddMeetupPage;
