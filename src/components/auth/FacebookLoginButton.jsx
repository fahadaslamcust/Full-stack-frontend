import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FACEBOOK_APP_ID } from "../../config/auth";
import { loadFacebookSdk } from "../../utils/loadFacebookSdk";

export default function FacebookLoginButton({
  mode = "signin",
  onSuccess,
  onError,
  disabled = false,
}) {
  const [sdkReady, setSdkReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!FACEBOOK_APP_ID) {
      return;
    }

    loadFacebookSdk(FACEBOOK_APP_ID)
      .then(() => setSdkReady(true))
      .catch(() => {
        onError?.();
      });
  }, [onError]);

  const handleClick = () => {
    if (!FACEBOOK_APP_ID) {
      onError?.();
      return;
    }

    if (!sdkReady || !window.FB) {
      onError?.();
      return;
    }

    setLoading(true);
    window.FB.login(
      (response) => {
        setLoading(false);
        if (response.authResponse?.accessToken) {
          onSuccess(response.authResponse.accessToken);
        } else {
          onError?.();
        }
      },
      { scope: "email,public_profile" },
    );
  };

  const label =
    mode === "signup" ? "Sign up with Facebook" : "Sign in with Facebook";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading || !sdkReady || !FACEBOOK_APP_ID}
      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 text-sm font-medium text-gray-700 transition-colors"
    >
      <FaFacebook className="text-[#1877F2] text-lg shrink-0" />
      <span>{loading ? "Connecting..." : label}</span>
    </button>
  );
}
