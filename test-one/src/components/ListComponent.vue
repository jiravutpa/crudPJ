<template>
  <div class="row justify-content-center">
    <div class="col-md-12">
      <h1>Show Data</h1>
      <div class="row">
        <div class="col-md-2">
          จำนวน/หน้า :
          <select v-model="perPage" class="form-select" @change="getModel()">
            <option
              v-for="(item, index) in perPageOp"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
        <div class="col-md-2">
          รุ่นรถ :
          <select v-model="brand" class="form-select" @click="getModel()">
            <option
              v-for="(item, index) in optionBrands"
              :key="index"
              :value="item"
            >
              {{ item.brandName }}
            </option>
          </select>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="name">ชื่อรถ:</label>
            <input
              type="text"
              class="form-control"
              v-model="codeName"
              required
            />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="name">รหัสรถ:</label>
            <input
              type="text"
              class="form-control"
              v-model="modelCode"
              required
            />
          </div>
        </div>
        <div class="col-md-1">
          <br /><button class="btn btn-primary" @click="getModel()">
            ค้นหา
          </button>
        </div>
        <div class="col-md-1">
          <br /><button class="btn btn-danger" @click="clear()">
            ล้างค่า
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th>ชื่อรถ</th>                
                <th>รหัสรถ</th>
                <th>ปี</th>
                <th>ชนิดน้ำมัน</th>
                <th>แก้ไข / ลบ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in Users" :key="user._id">
                <td>{{ user.name }}</td>
                <td>{{ user.modelCode }}</td>
                <td>{{ user.modelYear }}</td>
                <td>{{ user.fuel == "D" ? "ดีเซล" : "เบนซิน" }}</td>
                <td>
                  <router-link
                    :to="{ name: 'edit', params: { id: user.modelId } }"
                    class="btn btn-success"
                  >
                    edit </router-link
                  >&nbsp;
                  <button
                    @click="deleteModel(user.modelId)"
                    class="btn btn-danger"
                  >
                    Delete
                  </button>
                  <!-- <button @click="editModel(user.modelId)" class="btn btn-success">Edit</button> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      Users: [],
      page: 1,
      perPage: 10,
      perPageOp: [10, 20, 30, 40, 50],
      optionBrands: [],
      brand: [],
      codeName: [],
      modelCode:[]
    };
  },
  created() {
    this.getModel();
    this.getBrand();
    this.op();
  },
  methods: {
    async deleteModel(modelId) {
      await axios
        .delete(
          "https://dms-backend-dev-dxvb7izyka-as.a.run.app/api/vehicle-model/delete",
          {
            params: { modelId: modelId },
          }
        )
        .then((response) => {
          this.getModel();
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    op() {
      axios
        .get(
          "https://dms-backend-dev-dxvb7izyka-as.a.run.app/api/vehicle-model/brand",
          {
            params: {},
          }
        )
        .then((res) => {
          const arr = [];
          res.data.forEach((value) => {
            arr.push(value);
            console.log(value);
          });
          this.optionBrands = arr;

          console.log(arr);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getModel() {
      // console.log(this.perpage);
      await axios
        .get(
          "https://dms-backend-dev-dxvb7izyka-as.a.run.app/api/vehicle-model",
          {
            params: {
              page: 1,
              perPage: this.perPage,
              brandId: this.brand.brandId,
              name: this.codeName,
              modelCode: this.modelCode
            },
          }
        )
        .then((res) => {
          this.Users = res.data.data;
        })
        .catch((error) => {
          console.log("TT");
          console.log(error);
        });
    },
    async getBrand() {
      // console.log(this.perpage);
      await axios
        .get(
          "https://dms-backend-dev-dxvb7izyka-as.a.run.app/api/vehicle-model/brand",
          {
            params: {
              brand: this.brand,
            },
          }
        )
        .then((res) => {
          this.Users = res.data.data;
        })
        .catch((error) => {
          console.log("TT");
          console.log(error);
        });
    },clear(){
        this.modelCode=''
        this.codeName=''
        this.brand=[]
        this.getModel();
    }
  },
};
</script>