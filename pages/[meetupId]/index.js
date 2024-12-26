import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";
const MeetupDetails = () => {
  const router = useRouter();
  return <MeetupDetail meetupId={router.query.meetupId} />;
};

export default MeetupDetails;
