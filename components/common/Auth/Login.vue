<template>
  <body class="bg-white text-body font-body">
    <div class="main">
      <!--Header-->
      <header class="bg-transparent sticky-bar mt-4">
        <div class="container bg-transparent">
          <nav class="bg-transparent flex justify-between items-center py-3">
            <NuxtLink class="text-3xl font-semibold leading-none" to="/">
              <img
                class="h-10"
                src="~/assets/img/logos/monst-logo.svg"
                alt=""
              />
            </NuxtLink>
            <div class="hidden lg:block">
              <NuxtLink class="btn-primary hover-up-2" to="/sign-up"
                >Sign Up</NuxtLink
              >
            </div>
          </nav>
        </div>
      </header>

      <section class="relative pb-20">
        <div class="hidden lg:block absolute inset-0 w-1/2 ml-auto">
          <div
            class="
              flex
              items-center
              h-full
              wow
              animate__animated animate__fadeIn
              animated
            "
            data-wow-delay=".1s"
          >
            <img
              class="lg:max-w-lg mx-auto"
              src="~/assets/img/illustrations/space.svg"
              alt=""
            />
          </div>
        </div>
        <div class="container">
          <div class="relative flex flex-wrap pt-12">
            <div class="lg:flex lg:flex-col w-full lg:w-1/2 py-6 lg:pr-20">
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
                    src="~/assets/img/logos/facebook-sign.svg"
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
                    src="~/assets/img/logos/google-sign.svg"
                  />
                  <span>Sign In with Google</span>
                </button>
              </FormWrapper>

              <div class="w-full mt-12 mx-auto text-center">
                <p>
                  Don't Have an Account?
                  <NuxtLink
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
                    to="/sign-up"
                    >Sign Up now</NuxtLink
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- End .main -->
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
  methods: {},
}
</script>
