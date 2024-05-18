import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TbSocial } from "react-icons/tb";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import { CustomButton, Loading, TextInput } from "../components";
import { BgImage } from "../assets";
import { apiRequest, handleFileUpload } from "../Utils";

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [errMsg, setErrMsg] = useState("");
  const [picture, setPicture] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    setPicture(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const { firstName, lastName, email, password } = data;
    const uri = picture && (await handleFileUpload(picture));

    try {
      const res = await apiRequest({
        url: '/auth/register',
        data: { firstName, lastName, email, password, profileUrl: uri || "" },
        method: 'POST'
      });

      if (res?.status === "failed") {
        setErrMsg(res);
        setIsSubmitting(false);
      } else {
        setErrMsg(res);
        setTimeout(() => {
          window.location.replace('/login');
        }, 1000);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-400px py-8 lg:py-0 flex flex-row-reverse bg-primary rounded-xl overflow-hidden shadow-xl'>
        {/* RIGHT */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center '>
          <div className='w-full flex gap-2 items-center mb-4'>
            <div className='p-2 bg-[#065ad8] rounded text-white'>
              <TbSocial />
            </div>
            <span className='text-2xl text-[#065ad8] font-semibold'>
              ShareFun
            </span>
          </div>

          <p className='text-ascent-1 text-base text-2xl font-semibold'>
            Create your account
          </p>

          <form
            className='py-5 flex flex-col gap-5'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput
                name='firstName'
                label='First Name'
                placeholder='First Name'
                type='text'
                styles='w-full'
                register={register("firstName", {
                  required: "First Name is required!",
                })}
                error={errors.firstName?.message}
              />

              <TextInput
                name='lastName'
                label='Last Name'
                placeholder='Last Name'
                type='text'
                styles='w-full'
                register={register("lastName", {
                  required: "Last Name is required!",
                })}
                error={errors.lastName?.message}
              />
            </div>

            <TextInput
              name='email'
              placeholder='email@example.com'
              label='Email Address'
              type='email'
              register={register("email", {
                required: "Email Address is required",
              })}
              styles='w-full'
              error={errors.email?.message}
            />

            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput
                name='password'
                label='Password'
                placeholder='Password'
                type='password'
                styles='w-full'
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password?.message}
              />

              <TextInput
                name='cPassword'
                label='Confirm Password'
                placeholder='Confirm Password'
                type='password'
                styles='w-full'
                register={register("cPassword", {
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Passwords do not match";
                  },
                })}
                error={errors.cPassword?.message}
              />
            </div>

            <label
              className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
              htmlFor='imgUpload'
            >
              Upload your Profile Picture
              <input
                type='file'
                id='imgUpload'
                onChange={handleSelect}
                accept='.jpg, .png, .jpeg'
                className='hidden'
              />
            </label>

            {errMsg?.message && (
              <span className={`text-sm ${errMsg?.status === "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"} mt-0.5`}>
                {errMsg.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type='submit'
                containerStyles='inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none'
                title='Create Account'
              />
            )}
          </form>

          <p className='text-ascent-2 text-sm text-center'>
            Already have an account?{" "}
            <Link
              to='/login'
              className='text-[#065ad8] font-semibold ml-2 cursor-pointer'
            >
              Login
            </Link>
          </p>
        </div>
        {/* LEFT */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue'>
          <div className='relative w-full flex items-center justify-center'>
            <img
              src={BgImage}
              alt='Bg Image'
              className='w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover'
            />

            <div className='absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full'>
              <BsShare size={14} />
              <span className='text-xs font-medium'>Share</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full'>
              <ImConnection />
              <span className='text-xs font-medium'>Connect</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-white left-10 bottom-6 py-2 px-5 rounded-full'>
              <AiOutlineInteraction />
              <span className='text-xs font-medium'>Interact</span>
            </div>
          </div>

          <div className='mt-16 text-center'>
            <p className='text-white text-base'>
              Connect with friends & have share for fun
            </p>
            <span className='text-sm text-white/80'>
              Share memories with friends and the world.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
