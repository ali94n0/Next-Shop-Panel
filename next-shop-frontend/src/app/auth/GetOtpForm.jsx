import Loader from "@/common/Loader";
import TextField from "@/common/TextField";




function GetOtpForm({  isLoading ,formik}) {
    
    return (
        <div className="p-4 sm:rounded-md sm:shadow-lg">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-2 w-full sm:px-8">
                <TextField name={"phoneNumber"} id={"phoneNumber"} label="شماره همراه" type={"tel"} required formik={formik} />
                {isLoading ? <Loader width={50} height={25}/> : <button type="submit" className="btn btn__primary w-full my-2" disabled={formik.errors.phoneNumber || !formik.isValid || !formik.values.phoneNumber}>تائید</button>}
            </form>
        </div>
    );
}

export default GetOtpForm;