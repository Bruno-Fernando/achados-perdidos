import GoogleLogin from "./_components/GoogleLogin";
import ExtFormContainer from "@/components/ExtFormContainer";

function SignIn() {
  return (
    <ExtFormContainer>
      <h3 className="mb-8 text-center text-white">
        Clique no botão abaixo para realizar o login com o Google
      </h3>

      <GoogleLogin />
    </ExtFormContainer>
  );
}

export default SignIn;
