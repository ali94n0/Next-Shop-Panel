import {ThreeDots} from "react-loader-spinner"
//render Loader spinner (three dots)
function Loader({width=75,height=75}) {
    return (
        <div className="w-full flex justify-center items-center">
            <ThreeDots
  visible={true}
  height={width}
  width={height}
  color="rgb(var(--color-primary-800))"
  radius="9"
  ariaLabel="three-dots-loading"
  
  />
        </div>
    );
}

export default Loader;