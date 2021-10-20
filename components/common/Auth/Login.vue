<template class="mt-10">
  <body class="bg-body text-body font-body mt-20" style="overflow: visible">
    <div class="main">
      <header class="bg-transparent sticky-bar">
        <div class="container px-4 mx-auto bg-transparent">
          <nav class="bg-transparent flex justify-between items-center py-3">
            <a class="text-3xl font-semibold leading-none" href="index.html">
              <img class="h-10" src="~/assets/img/logo/monst-logo.svg" alt="" />
            </a>

            <div
              class="hidden lg:block"
              style="
                visibility: visible;
                animation-delay: 0.1s;
                animation-name: fadeIn;
              "
            >
              <a
                class="
                  tracking-wide
                  hover-up-2
                  mr-2
                  inline-block
                  px-4
                  py-3
                  text-xs text-blue-500
                  hover:text-blue-700
                  font-semibold
                  leading-none
                  border border-blue-200
                  hover:border-blue-300
                  rounded
                "
                href="login.html"
              >
                Sign Up
              </a>
            </div>
            <div class="lg:hidden">
              <button
                class="
                  navbar-burger
                  flex
                  items-center
                  py-2
                  px-3
                  text-blue-500
                  hover:text-blue-700
                  rounded
                  border border-blue-200
                  hover:border-blue-300
                "
              >
                <svg
                  class="fill-current h-4 w-4"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Mobile menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>
      <div class="hidden navbar-menu relative z-50 transition duration-300">
        <div
          class="navbar-backdrop fixed inset-0 bg-blueGray-800 opacity-25"
        ></div>
        <nav
          class="
            fixed
            top-0
            left-0
            bottom-0
            flex flex-col
            w-5/6
            max-w-sm
            py-6
            px-6
            bg-white
            border-r
            overflow-y-auto
            transition
            duration-300
          "
        >
          <div class="flex items-center mb-8">
            <a class="mr-auto text-3xl font-semibold leading-none" href="#">
              <img class="h-10" src="~/assets/img/logo/monst-logo.svg" alt="" />
            </a>
            <button class="navbar-close">
              <svg
                class="
                  h-6
                  w-6
                  text-blueGray-400
                  cursor-pointer
                  hover:text-blue-500
                "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <div class="mt-4 pt-6 border-t border-blueGray-100">
              <a
                class="
                  block
                  px-4
                  py-3
                  mb-3
                  text-xs text-center
                  font-semibold
                  leading-none
                  bg-blue-400
                  hover:bg-blue-500
                  text-white
                  rounded
                "
                href="#"
                >Sign Up</a
              >
              <a
                class="
                  block
                  px-4
                  py-3
                  mb-2
                  text-xs text-center text-blue-500
                  hover:text-blue-700
                  font-semibold
                  leading-none
                  border border-blue-200
                  hover:border-blue-300
                  rounded
                "
                href="#"
                >Log In</a
              >
            </div>
          </div>
          <div class="mt-auto">
            <p class="my-4 text-xs text-blueGray-400">
              <span>Get in Touch</span>
              <a class="text-blue-500 hover:text-blue-500 underline" href="#"
                >contact@monst.com</a
              >
            </p>
            <a class="inline-block px-1" href="#">
              <img src="~/assets/img/logo/facebook-blue.svg" alt="" />
            </a>
            <a class="inline-block px-1" href="#">
              <img src="~/assets/img/logo/twitter-blue.svg" alt="" />
            </a>
            <a class="inline-block px-1" href="#">
              <img src="~/assets/img/logo/instagram-blue.svg" alt="" />
            </a>
          </div>
        </nav>
      </div>

      <section class="relative pb-20">
        <div class="hidden lg:block absolute inset-0 w-1/2 ml-auto mb-20">
          <div
            class="
              flex
              items-center
              h-full
              wow
              animate__ animate__fadeIn
              animated animated
            "
            data-wow-delay=".1s"
            style="
              visibility: visible;
              animation-delay: 0.1s;
              animation-name: fadeIn;
            "
          >
            <img
              class="lg:max-w-lg mx-auto"
              src="~/assets/img/logo/space.svg"
              alt=""
            />
          </div>
        </div>
        <div class="container px-4 mx-auto">
          <div class="relative flex flex-wrap pt-12">
            <div
              class="lg:flex lg:flex-col w-full lg:w-1/2 py-6 lg:pr-20 ml-40"
            >
              <FormWrapper
                ref="loginForm"
                :model="form"
                class="
                  w-full
                  max-w-lg
                  mx-auto
                  lg:mx-0
                  my-auto
                  wow
                  animate__ animate__fadeIn
                  animated animated
                "
                data-wow-delay=".3s"
                style="
                  visibility: visible;
                  animation-delay: 0.3s;
                  animation-name: fadeIn;
                "
                @onSubmit="$emit('my-login-form-submit', form)"
              >
                <span class="text-sm text-blueGray-400">Sign In</span>
                <h4 class="mb-6 text-3xl">Join our community</h4>
                <InputWrapper
                  rules="required|email|max_length:255"
                  prop="email"
                >
                  <el-input
                    v-model="form.email"
                    type="email"
                    class="
                      w-full
                      py-4
                      text-xs
                      placeholder-blueGray-400
                      font-semibold
                      leading-none
                      bg-blueGray-50
                      outline-none
                    "
                    required
                    placeholder="name@email.com"
                    @blur="validateEmail"
                  />
                </InputWrapper>
                <InputWrapper
                  rules="required|max_length:255"
                  prop="password"
                  class="-mt-5"
                >
                  <el-input
                    v-model="form.password"
                    type="password"
                    show-password
                    class="
                      w-full
                      py-4
                      text-xs
                      placeholder-blueGray-400
                      font-semibold
                      leading-none
                      bg-blueGray-50
                      outline-none
                    "
                    placeholder="Enter your password"
                  />
                </InputWrapper>
                <div
                  class="float-left mb-6 wow animate__ animate__fadeIn animated"
                  data-wow-delay=".1s"
                  style="
                    visibility: visible;
                    animation-delay: 0.1s;
                    animation-name: fadeIn;
                  "
                >
                  <label class="inline-flex text-xs">
                    <input type="checkbox" class="form-checkbox" checked="" />
                    <span class="ml-2"
                      >I agree to
                      <a class="underline hover:text-blueGray-500" href="#"
                        >Police privacy</a
                      >
                      and
                      <a class="underline hover:text-blueGray-500" href="#"
                        >Terms of Use</a
                      ></span
                    >
                  </label>
                </div>
                <el-button
                  native-type="submit"
                  type="success"
                  class="
                    transition
                    duration-300
                    ease-in-out
                    transform
                    hover:-translate-y-1
                    block
                    w-full
                    p-4
                    text-center text-xs text-white
                    font-semibold
                    leading-none
                    hover:bg-blue-700
                    rounded
                  "
                  style="
                    --tw-bg-opacity: 1;
                    background-color: rgba(59, 130, 246, var(--tw-bg-opacity));
                  "
                >
                  Sign In
                </el-button>
                <p
                  class="
                    my-6
                    text-xs text-blueGray-400 text-center
                    font-semibold
                  "
                >
                  or continue with
                </p>
                <button
                  class="
                    transition
                    duration-300
                    ease-in-out
                    transform
                    hover:-translate-y-1
                    flex
                    items-center
                    w-full
                    px-4
                    py-3
                    mb-2
                    text-xs text-blueGray-500
                    font-semibold
                    leading-none
                    border
                    hover:bg-blueGray-50
                    rounded
                  "
                  href="#"
                >
                  <img
                    class="h-6 pr-10"
                    src="~/assets/img/logo/facebook-sign.svg"
                  />
                  <span>Sign In with Facebook</span>
                </button>
                <button
                  class="
                    transition
                    duration-300
                    ease-in-out
                    transform
                    hover:-translate-y-1
                    flex
                    items-center
                    px-4
                    py-3
                    w-full
                    text-xs text-blueGray-500
                    font-semibold
                    leading-none
                    border
                    hover:bg-blueGray-50
                    rounded
                  "
                  href="#"
                >
                  <img
                    class="h-6 pr-10"
                    src="~/assets/img/logo/google-sign.svg"
                  />
                  <span>Sign In with Google</span>
                </button>
              </FormWrapper>

              <div class="w-full mt-12 mx-auto text-center">
                <p>
                  Don't Have an Account?
                  <a
                    class="
                      inline-block
                      text-xs text-blue-600
                      hover:text-blue-700
                      font-semibold
                      leading-none
                      wow
                      animate__animated animate__fadeIn
                      animated
                    "
                    data-wow-delay=".1s"
                    href="signup.html"
                    style="
                      visibility: hidden;
                      animation-delay: 0.1s;
                      animation-name: none;
                    "
                    >Sign Up now</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </body>
</template>
<script>
import { FormWrapper, InputWrapper } from '~templates/Form'
export default {
  components: {
    FormWrapper,
    InputWrapper,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    reset() {
      this.$refs.loginForm.reset()
    },
  },
}
</script>
