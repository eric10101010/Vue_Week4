<template>
    <div class="container mt-3">
        <div class="row py-3">
            <div class="col-md-10">
                <div class="d-flex justify-content-between">
                    <h2>產品列表</h2>
                    <button class="btn btn-primary text-white" @click="openModal('new')">建立新產品</button>
                </div>  
            <table class="table table-hover mt-4">
                <thead>
                    <tr>
                        <th width="150">產品名稱</th>
                        <th width="120">原價</th>
                        <th width="120">售價</th>
                        <th width="150">是否啟用</th>
                        <th width="160">編輯產品</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in productsList" :key="item.id">
                        <td width="150">{{ item.title }}</td>
                        <td width="120">{{ item.origin_price }}</td>
                        <td width="120">{{ item.price }}</td>
                        <td width="150">
                            <span v-if="item.is_enabled" class="text-success" >啟用</span>
                            <span v-else class="text-danger">未啟用</span>
                        </td>
                        <td width="160" class="d-flex justify-content-between">
                            <button type="button" class="btn btn-primary text-white" @click="openModal('edit', item)">
                            編輯
                            </button>
                            <button type="button" class="btn btn-danger" @click="openModal('delete', item)">
                            刪除
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>目前有 <span class="text-success">{{ productsList.length }}</span> 項產品</p>
            <pagination :pages="pages" :get-products="getProducts"></pagination>
            </div>
        </div>
    </div>
    <ProductModal :tempProduct="tempProduct" :isNew="isNew" @update-temp-product="changeTempProduct" ref="changeModal"></ProductModal>
    <DelProductModal :del-product="delProduct" :tempProduct="tempProduct" ref="delModal"></DelProductModal>
</template>
<script>

import axios from 'axios'
import ProductModal from '../components/ProductModal.vue'
import DelProductModal from '../components/DelProductModal.vue'
import pagination from '../components/pagination.vue'

const { VITE_API, VITE_PATH } = import.meta.env

export default {
    data() {
        return {
            productsList: [],
            tempProduct: {
                imagesUrl: [],
                imageUrl:'',
            },
            pages: {},
            isNew: false,
        }
    },
    methods: {
        //確認登入
        checkUser() {
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("hexToken="))
                ?.split("=")[1];
            axios.defaults.headers.common['Authorization'] = token;
            
            axios.post(`${VITE_API}/api/user/check`, null)
                .then(() => {
                    this.getProducts();
                })
                .catch(err => {
                    console.dir(err);
                })
        },
        //取得產品列表
        getProducts(page = 1) {
            const api =`${VITE_API}/api/${VITE_PATH}/admin/products?page=${page}`;
            axios.get(api)
            .then(res => {
                this.productsList = res.data.products;
                this.pages = res.data.pagination;
                // console.log(res.data);
                //console.log(this.pages);
            })
            .catch(err => {
                console.dir(err.response.data);
            })
        },
        //彈跳視窗
        openModal(status, item) {
            if(status === 'new') {
                this.tempProduct = {
                    imagesUrl: [],
                }
                this.isNew = true;
                this.$refs.changeModal.openModal();
            } else if (status === 'edit') {
                this.tempProduct = { ...item }; //顯示已有產品資訊
                if(!Array.isArray(this.tempProduct.imagesUrl)) {
                    this.tempProduct.imagesUrl = [];
                }
                this.isNew = false;
                this.$refs.changeModal.openModal();
            } else if (status === 'delete') {
                this.tempProduct = { ...item }; 
                this.isNew = false;
                this.$refs.delModal.openModal();
                console.log(this.tempProduct.title);
            } 
        },
        //更新產品
        updateProduct() {
            let api = `${VITE_API}/api/${VITE_PATH}/admin/product`; // 新增
            let method ='post'; //方便切換的方法，此為新增
            let name = this.tempProduct.title;
            if(!this.isNew) {
                api = `${VITE_API}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
                method = 'put';
                alert('修改產品資料成功');
            } else {
                alert(`成功新增 ${name} 加入到產品列表`);
            }
            axios[method](api, { data:this.tempProduct })
            .then(res => {
                // console.log(res.data);
                this.getProducts();
                this.$refs.changeModal.closeModal();
            })
            .catch(err => {
                console.dir(err);
                alert('請正確填寫欄位資料');
            })
        },
        //存入已有資料
        changeTempProduct (updateTempProduct) {
            this.tempProduct = updateTempProduct;
            this.updateProduct();
        },
        //刪除產品
        delProduct() {
            const api = `${VITE_API}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`; 
            axios.delete(api)
            .then(res => {
                // console.log(res);
                this.$refs.delModal.closeModal();
                this.getProducts();
            })
            .catch(err => {
                alert('刪除產品失敗');
                console.dir(err);
            })
        }
    },
    mounted() {
        this.checkUser();
    },
    
    components: {
        ProductModal,
        DelProductModal,
        pagination
    }
}

</script>



