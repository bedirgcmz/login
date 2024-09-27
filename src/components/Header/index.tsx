import bg from "../../../public/images/bgheader.png";

const Header = () => {
  return (
    <div
      className="w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bgheader.png')" }}
    >
      <h1 className="text-center text-5xl md:text-6xl py-6 bg-[#b08968] text-[#e6ccb2] charmonman-bold header-bg">
        "Cooking is an art"
      </h1>
    </div>
  );
};

export default Header;
