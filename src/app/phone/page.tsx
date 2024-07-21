import Phone from "@/components/Phone";
const PhoneDetails = ({
  searchParams,
}: {
  searchParams: {
    mobile: "string";
  };
}) => {
  return <Phone mobileNo={searchParams.mobile} />;
};
export default PhoneDetails;
