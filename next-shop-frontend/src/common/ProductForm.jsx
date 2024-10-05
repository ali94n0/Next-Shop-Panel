import { TagsInput } from "react-tag-input-component";
import Select from 'react-select';
import TextField from "./TextField";
import Loader from "@/common/Loader";

const productsFormData = [
  {
    id: 1,
    label: "عنوان",
    name: "title",
  },
  {
    id: 2,
    label: "توضیحات",
    name: "description",
  },
  {
    id: 3,
    label: "اسلاگ",
    name: "slug",
  },
  {
    id: 4,
    label: "برند",
    name: "brand",
  },
  {
    id: 5,
    label: "قیمت",
    name: "price",
  },
  {
    id: 6,
    label: "تخفیف",
    name: "discount",
  },
  {
    id: 7,
    label: "قیمت با تخفیف",
    name: "offPrice",
  },
  {
    id: 8,
    label: "موجودی",
    name: "countInStock",
  },
  {
    id: 9,
    label: "لینک عکس محصول",
    name: "imageLink",
  },
];

function ProductForm({formik,isLoading,isPending,options,product}) {
    return (
        
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-8 p-8">
                    {productsFormData.map(item => <TextField key={item.id} name={item.name} id={item.id} label={item.label} required formik={formik} />)}
                    <div className="flex flex-col gap-y-1 -mt-4">
                        <label htmlFor="tags" className="bg-secondary-0 text-xs sm:text-sm text-secondary-600 font-light px-1 mr-2 rounded-md">تگ ها</label>
                        <TagsInput
                            value={(formik.values.tags.length === 0 && product) ? product?.tags  : formik.values.tags }
                            onChange={(tag) => formik.setFieldValue("tags", tag)}
                            onBlur={()=>formik.setFieldTouched("tags",true)}
                            name="tags"
                            id="tags"
                            placeHolder="تگ را وارد کنید"
                            classNames={{input:"textField__style !text-xs !font-normal !flex-1" ,tag:"text-secondary-500 text-xxs px-4 py-2 rounded-lg "}}
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="bg-secondary-0 text-xs sm:text-sm text-secondary-600 font-light px-1 mr-2 rounded-md">دسته بندی&nbsp;<span className="text-error text-xxs sm:text-sm">*</span></label>
                        {isLoading ? <Loader width={40} height={20} /> : <div className="flex flex-col gap-y-1">
                            <Select
                        defaultValue={product ? product?.category : formik.values.category}

                                onChange={(selectedOption) => formik.setFieldValue("category", selectedOption._id)}
                                onBlur={()=>formik.setFieldTouched("category",true)}
                                options={options}
                                id="category"
                                name="category"
                                getOptionLabel={(option) => option.title}
                                getOptionValue={(option) => option._id}
                                placeholder="دسته‌بندی را انتخاب کنید"
                                className="textField__style !p-0"
                            />
                        {formik.errors.category && formik.touched.category && <span className="block text-xxxs sm:text-xxs text-error">{formik.errors.category}</span>}
                        </div>}
                        
                        
                    </div>
                    {isPending ? <Loader width={50} height={25}/> : <button type="submit" className="btn btn__primary">تایید</button>}
                </form>
        
    );
}

export default ProductForm;