import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/image.png";
import "../assets/styles/signUpForm.css";
import { toast } from "react-toastify";
import { signUp, sendOtp, verifyOtp } from "../services/auth";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    country: "",
    confirmPassword: "",
  });

  const [otpRequested, setOtpRequested] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerifyOtpClicked = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await sendOtp(formData.email);
    setIsLoading(false);

    if (response.error) {
      toast.error("Error occurred while sending OTP");
      return;
    }

    toast.success("OTP sent successfully");
    setOtpRequested(true);
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    setIsLoading(true);
    const response = await verifyOtp(formData.email, otp);
    setIsLoading(false);

    if (response.error) {
      toast.error("Invalid or expired OTP");
      return;
    }

    toast.success("OTP verified successfully");
    setOtpRequested(false);
    setIsOtpVerified(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    const response = await signUp(formData);
    setIsLoading(false);

    if (response.error) {
      toast.error(response.error.message || "Signup failed");
      return;
    }

    toast.success("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="signup-form">
      <img className="logo" src={Logo} alt="Logo" />
      <h1>Sign up to start </h1>
      <h1>listening</h1>
      <form onSubmit={isOtpVerified ? handleSubmit : handleVerifyOtp}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            disabled={isOtpVerified}
            required
          />
        </div>

        {otpRequested && !isOtpVerified && (
          <div className="form-group">
            <label htmlFor="otp">Enter OTP</label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter the OTP sent to your email"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              maxLength={6}
              required
            />
            <button type="submit" disabled={isLoading} className="signupform-btns">
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {!otpRequested && !isOtpVerified && (
          <button
            type="button"
            onClick={handleVerifyOtpClicked}
            disabled={isLoading}
            className="signupform-btns"
          >
            {isLoading ? "Sending OTP..." : "Send Verification Email"}
          </button>
        )}

        {isOtpVerified && (
          <>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                id="dob"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                type="text"
                name="country"
                placeholder="Enter country name"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <button className="signupform-btns" type="submit" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
