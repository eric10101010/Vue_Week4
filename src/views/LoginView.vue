<template>
    <div class="container">
        <div class="row d-flex justify-content-center align-items-center vh-100">
            <div class="col-8">
                <h1 class="h3 mb-3 font-weight-normal text-center mb-4">會員登入</h1>
                <form id="form" class="form-signin" @submit.prevent="userLogin">
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="username"
                            placeholder="name@example.com" v-model="user.username" required autofocus>
                        <label for="username">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="password"
                            placeholder="Password" v-model="user.password" required>
                        <label for="password">Password</label>
                    </div>
                    <button class="btn btn-lg btn-primary w-100 mt-3 text-white" type="submit">登入</button>
                </form>
                <p class="mt-5 h4 text-center">&copy; 2023~∞ - 六角學院VueWeek2</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

const { VITE_API } = import.meta.env

export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
            }
        };
    },
    methods: {
        userLogin() {
            axios.post(`${VITE_API}/admin/signin`, this.user)
                .then(res => {
                    const { token, expired } = res.data;
                    document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
                    alert('恭喜～成功登入');
                    this.$router.push('/producView')
                })
                .catch(err => {
                    alert('失敗，請確認再次輸入正確密碼');
                    console.dir(err.response.data);
                })
        }
    }
}
</script>