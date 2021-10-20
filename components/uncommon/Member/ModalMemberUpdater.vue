<template>
  <DialogWrapper
    id="modal-member-updater"
    title="Chỉnh Sửa Thông Tin"
    width="400px"
    :center="true"
  >
    <FormWrapper :model="profile" @onSubmit="handleSubmit">
      <div class="flex">
        <el-avatar :size="120" src="https://empty">
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          />
        </el-avatar>
        <div class="flex-1 ml-5">
          <InputWrapper rules="required" prop="firstName">
            <span slot="label" class="text-md font-medium">
              <fa :icon="['fas', 'user']" class="text-lg text-theme-1" />
              Họ
            </span>
            <el-input
              v-model="profile.firstName"
              maxlength="30"
              placeholder="Nhập Họ"
            ></el-input>
          </InputWrapper>

          <InputWrapper rules="required" prop="lastName">
            <span slot="label" class="text-md font-medium">
              <fa :icon="['fas', 'user']" class="text-lg text-theme-1" />
              Tên
            </span>
            <el-input
              v-model="profile.lastName"
              maxlength="10"
              placeholder="Nhập Tên"
            ></el-input>
          </InputWrapper>
        </div>
      </div>

      <el-form-item class="custom-from-item">
        <span slot="label" class="text-md font-medium">
          <fa :icon="['fas', 'envelope']" class="text-lg text-theme-1" />
          Email
        </span>
        <el-input :value="initialUser.email" disabled></el-input>
      </el-form-item>

      <InputWrapper rules="required|boolean" prop="gender">
        <span slot="label" class="text-md font-medium">
          <fa :icon="['fas', 'male']" class="text-lg text-theme-1" />
          <fa :icon="['fas', 'female']" class="text-lg text-theme-1" />
          Giới Tính
        </span>
        <el-radio-group
          v-model="profile.gender"
          size="small"
          class="block flex"
        >
          <el-radio-button class="flex-1" :label="true">
            <fa :icon="['fas', 'mars']" class="text-lg" />
            Nam
          </el-radio-button>
          <el-radio-button class="flex-1" :label="false">
            <fa :icon="['fas', 'venus']" class="text-lg" />
            Nữ
          </el-radio-button>
        </el-radio-group>
      </InputWrapper>

      <!-- <InputWrapper rules="required" prop="major">
        <span slot="label" class="text-md font-medium">
          <fa :icon="['fas', 'user-tie']" class="text-lg text-theme-1" />
          Chuyên Ngành
        </span>
        <el-select placeholder="Chọn Chuyên Ngành" class="w-full">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </InputWrapper> -->

      <!-- <InputWrapper rules="required" prop="universityId">
        <span slot="label" class="text-md font-medium">
          <fa :icon="['fas', 'school']" class="text-lg text-theme-1" />
          Trường Học
        </span>
        <el-select
          v-model="profile.universityId"
          placeholder="Chọn Trường"
          class="w-full"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </InputWrapper> -->

      <div class="flex">
        <InputWrapper rules="required|date" prop="birthday">
          <span slot="label" class="text-md font-medium">
            <fa :icon="['fas', 'gift']" class="text-lg text-theme-1" />
            Ngày Sinh
          </span>
          <el-date-picker
            v-model="profile.birthday"
            type="date"
            format="dd/MM/yyyy"
            placeholder="DD/MM/YYYY"
            class="w-[160px]"
          >
          </el-date-picker>
        </InputWrapper>
        <InputWrapper rules="required" prop="phone" class="ml-3 flex-1">
          <span slot="label" class="text-md font-medium">
            <fa :icon="['fas', 'phone']" class="text-lg text-theme-1" />
            Phone
          </span>
          <el-input
            v-model="profile.phone"
            maxlength="13"
            placeholder="Nhập SĐT"
          ></el-input>
        </InputWrapper>
      </div>

      <el-button type="primary" native-type="submit" class="w-full"
        >Cập Nhật</el-button
      >
    </FormWrapper>
  </DialogWrapper>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { FormWrapper, InputWrapper } from '~/components/common/Templates/Form'
import { DialogWrapper } from '~/components/common/Templates/Dialog'
import { userActions } from '~/store/users/actions'
import { userMutations } from '~/store/users/mutations'

export default {
  name: 'ModalMemberUpdater',
  components: {
    FormWrapper,
    DialogWrapper,
    InputWrapper,
  },
  props: {
    initialUser: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    const {
      firstName,
      lastName,
      gender,
      birthday,
      phone,
    } = this.initialUser.profile
    return {
      options: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
      ],
      profile: {
        firstName,
        lastName,
        gender,
        phone,
        birthday: new Date(birthday),
      },
    }
  },
  methods: {
    async handleSubmit() {
      await this.updateUserAsync({
        id: this.initialUser._id,
        form: {
          profile: {
            ...this.profile,
            birthday: this.profile.birthday.getTime(),
          },
        },
      })
      const payload = {
        ...this.initialUser,
        profile: { ...this.initialUser.profile, ...this.profile },
      }
      this.setSelectedUser(payload)
    },
    ...mapActions({
      updateUserAsync: userActions.UPDATE.SINGLE,
    }),
    ...mapMutations({
      setSelectedUser: userMutations.SET.SELECTED,
    }),
  },
}
</script>
