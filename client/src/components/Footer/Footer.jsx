export const Footer = () => {
  return (
    <div
      className="white-text bg-dark mt-4 py-3 d-flex justify-content-center"
      data-bs-theme="dark"
    >
      <img
        src="/android-chrome-256x256.png"
        alt="logo"
        width={50}
        style={{ borderRadius: "10px", marginRight: "10px" }}
      />
      <div>
        Drink Stop &copy; 2024, All Rights Reserved. <br />
        Contact us at: info@drinkstop.com
      </div>
    </div>
  );
};
