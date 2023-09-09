<template>
    <div class="login-box">
        <el-form ref="ruleFormRef" :model="ruleFrom" status-icon :rules="rules" label-width="60px" class="demo-ruleForm">

            <h2 class="login-h2">后台管理系统</h2>

            <el-form-item label="账号 " prop="userName">
                <el-input v-model="ruleFrom.userName" autocomplete="off" />
            </el-form-item>

            <el-form-item label="密码" prop="passWord">
                <el-input v-model="ruleFrom.passWord" type="password" autocomplete="off" />
            </el-form-item>

            <el-form-item>
                <el-button class="login-btn" type="primary" @click="submitForm(ruleFormRef)">
                    登录
                </el-button>

                <el-button class="login-btn" @click="resetForm">
                    重置
                </el-button>

            </el-form-item>


        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'

import {loginRequest} from '../request/api'
import { LoginData } from '../type/login'
import type { FormInstance } from 'element-plus'
import {useRouter} from 'vue-router'; 


export default defineComponent({

    setup() {
        const data = reactive(new LoginData());

        const rules = {
            userName:
                [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 3, max: 10, message: '账号长度3到5', trigger: 'blur' }
                ],

            passWord: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 10, message: '密码的长度在3到10', trigger: 'blur' },
            ]
        }

        const ruleFormRef = ref<FormInstance>()

        const router = useRouter(); //-->$router
        const submitForm = (formEl: FormInstance | undefined) => {
            
            console.log(formEl);
            if (!formEl) return
            //对表单进行验证，返回bool类型
            formEl.validate((valid) => {
                if (valid) {
                    console.log('submit!')
                    loginRequest(data.ruleFrom).then((res: any) => {
                        // console.log(res.data.msg)
                        localStorage.setItem('token',res.msg)
                        router.push('/')
                    })
                } else {
                    console.log('error submit!')
                    return false
                }
            })
        }

        //重置
        const resetForm = () => {
            data.ruleFrom.userName = "",
                data.ruleFrom.passWord = ""
        }

        return {
            ...toRefs(data),
            rules,
            resetForm,
            ruleFormRef,
            submitForm
        }
    }
})
</script>

<style lang='scss' scoped>
.login-box {
    width: 100%;
    height: 100%;
    background: url(../assets/bg_image.png);
    padding: 1px;
    text-align: center;


    .login-h2 {
        margin-bottom: 20px;
    }

    .demo-ruleForm {
        width: 500px;
        margin: 200px auto;
        background-color: white;
        padding: 40px;
        border-radius: 10px;
    }

    .login-btn {
        width: 48%;
    }
}
</style>