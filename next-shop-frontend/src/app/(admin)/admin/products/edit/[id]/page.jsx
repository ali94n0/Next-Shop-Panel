"use client"

import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useEditProduct, useGetProductById } from "@/hooks/useProductAdmin";
import Loader from "@/common/Loader";
import { includesObj } from "@/utils/objectUtils";
import ProductForm from "@/common/ProductForm";
import { useEffect } from "react";
import { useGetAllCategories } from "@/hooks/useCategoryAdmin";
import toast from "react-hot-toast";


const validationSchema = Yup.object({
  title: Yup.string()
    .required('عنوان الزامی است')
    .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
    .max(100, 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد'),
  description: Yup.string()
    .required('توضیحات الزامی است')
    .min(10, 'توضیحات باید حداقل ۱۰ کاراکتر باشد'),
  slug: Yup.string()
    .required('مسیر الزامی است')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'مسیر باید با حروف کوچک انگلیسی و خط تیره باشد'),
  brand: Yup.string()
    .required('برند الزامی است')
    .min(3, 'برند باید حداقل ۳ کاراکتر باشد'),
  price: Yup.number()
    .required('قیمت الزامی است')
    .integer('قیمت باید عدد صحیح باشد')
    .min(0, 'قیمت نمی‌تواند منفی باشد'),
  discount: Yup.number()
    .min(0, 'تخفیف نمی‌تواند کمتر از ۰ باشد')
    .max(100, 'تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد'),
  offPrice: Yup.number()
    .required('قیمت نهایی الزامی است')
    .integer('قیمت نهایی باید عدد صحیح باشد')
    .min(0, 'قیمت نهایی نمی‌تواند منفی باشد')
    .max(Yup.ref('price'), 'قیمت نهایی نباید بیشتر از قیمت اصلی باشد'),
  countInStock: Yup.number()
    .required('موجودی الزامی است')
    .min(0, 'موجودی نمی‌تواند کمتر از ۰ باشد'),
  imageLink: Yup.string()
    // .url('لینک تصویر معتبر نیست')
        .required('لینک تصویر الزامی است'),
    tags: Yup.array(),
  category:Yup.string().required('انتخاب دسته بندی الزامی است')
});



function page() {
    const router=useRouter()
    const { id } = useParams()
    const { data:productData, isLoading: isGettingProduct } = useGetProductById(id)
    const { product } = productData || {}
    const { data:categoriesData, isLoading } = useGetAllCategories()
    const { categories } = categoriesData || {};
    const {mutate:editProduct ,isPending}=useEditProduct()
    
    
    
    
    
    const formik = useFormik({
        initialValues:{
            title: "",
            description: "",
            slug: "",
            brand: "",
            price: "",
            discount: "",
            offPrice: "",
            countInStock: "",
            imageLink: "",
            tags: product ? product?.tags : [],
            category:product ? product?.category?._id : "",
},
        validationSchema,
        onSubmit: (values) => {
            handleEditProduct(id,values)
            
        }
    })

    const handleEditProduct = async (id,data) => {
        try {
            await editProduct({ id, data }, {
                onSuccess: ({statusCode}) => {
                    if (statusCode === 200) {
                        router.push("/admin/products")
                    }
                }
            })
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        if (product) {
             formik.setValues(includesObj(product, ["title", "description", "slug", "brand", "price", "discount", "offPrice", "countInStock", "imageLink", "tags"]))
            
            formik.setFieldValue("tags", product?.tags)
            formik.setFieldValue("category",product?.category?._id)
            
            
        }
        
    }, [product])
    
    

    
    return (
        <div className="container max-w-screen-md p-4  ">
            <h3 className="text-sm md:text-lg text-secondary-700 font-bold px-4 py-2 mb-4">ویرایش محصول</h3>
                {isGettingProduct ? <Loader width={50} height={25}/> : <div className="flex flex-col gap-y-4 max-w-screen-sm rounded-md shadow-lg shadow-secondary-50/50 mx-auto">
                    <ProductForm formik={formik} options={categories} isLoading={isLoading} isPending={isPending} product={product || {}} />
                </div>}
            
            
            
        </div>
    );
}

export default page;