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
              <NuxtLink class="btn-primary hover-up-2" to="/login"
                >Log In</NuxtLink
              >
            </div>
          </nav>
        </div>
      </header>

      <section class="py-12 bg-blueGray-50">
        <div class="container">
          <div class="flex max-w-md mx-auto flex-col text-center">
            <div class="mt-12 mb-8 p-8 bg-white rounded shadow">
              <h4 class="mb-6 text-3xl">Create an Account</h4>
              <FormWrapper
                ref="signUpForm"
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
                @onSubmit="$emit('signUp-form-submit', form)"
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
                  rules="required|string|max_length:255"
                  prop="name"
                >
                  <el-input
                    v-model="form.name"
                    type="string"
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
                    placeholder="Your name"
                  />
                </InputWrapper>
                <InputWrapper rules="boolean" prop="gender">
                  <el-radio-group
                    v-model="form.gender"
                    size="small"
                    class="block flex"
                  >
                    <el-radio-button class="flex-1" :label="true">
                      <fa :icon="['fas', 'mars']" class="text-lg" />
                      Male
                    </el-radio-button>
                    <el-radio-button class="flex-1" :label="false">
                      <fa :icon="['fas', 'venus']" class="text-lg" />
                      Female
                    </el-radio-button>
                  </el-radio-group>
                </InputWrapper>
                <InputWrapper
                  rules="required|max_length:30|min_length:8"
                  prop="password"
                  class="-mt-5"
                >
                  <el-input
                    v-model="form.password"
                    type="password"
                    show-password
                    class="
                      w-full
                      mt-4
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
                <InputWrapper
                  rules="required|max_length:30|min_length:8"
                  prop="confirmPassword"
                  class="-mt-5"
                >
                  <el-input
                    v-model="form.confirmPassword"
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
                    placeholder="Enter your confirm password"
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
            </div>
            <div>
              <p class="text-xs text-blueGray-400 text-center">
                <a class="underline hover:text-blueGray-500" href="#"
                  >Police privacy</a
                >
                and
                <a class="underline hover:text-bluegray-500" href="#"
                  >Terms of Use</a
                >
              </p>
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
        confirmPassword: '',
        name: '',
        gender: '',
      },
    }
  },
  watch: {},
  methods: {},
}
</script>
