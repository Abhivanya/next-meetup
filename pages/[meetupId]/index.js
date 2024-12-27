import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";
const MeetupDetails = (props) => {
  const router = useRouter();
  return <MeetupDetail meetupId={props.meetupId} />;
};

export function getStaticPaths() {
  return {
    fallback: true,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}
export const getStaticProps = (context) => {
  const meetupId = context.params.meetupId;
  return {
    props: {
      meetupId: meetupId,
    },
  };
};

export default MeetupDetails;
