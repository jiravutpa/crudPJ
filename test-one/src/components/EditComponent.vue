<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h1>Edit</h1>
      <form @submit.prevent="handleSubmitForm">
        <div class="form-group">
          <label for="name">Brand (ID)</label>
          <select v-model="user.brandId" class="form-select">
            <option
              v-for="(item, index) in optionBrands"
              :key="index"
              :value="item"
            >
              {{ item.brandName }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="name">Model Code</label>
          <input
            type="text"
            class="form-control"
            v-model="user.modelCode"
            required
          />
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            v-model="user.name"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Model Year</label>
          <input
            type="number"
            class="form-control"
            v-model="user.modelYear"
            required
          />
        </div>
        <div class="form-group">
          <label for="phone">Fuel</label>

          <select v-model="user.fuel" class="form-select">
            <option
              v-for="(itemf, index) in optionFuel"
              :key="index"
              :value="itemf"
            >
              {{ itemf.name }}
            </option>
          </select>
        </div>
        <br />
        <div class="form-group">
          <button class="btn btn-success btn-block">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";

// import Multiselect from "vue-multiselect";

export default {
  //   components: { Multiselect },
  created() {
    this.showModel();
    this.op();
    
  },
  data() {
    return {
      optionBrands: [],
      optionFuel: [
        {
          id: "D",
          name: "ดีเซล",
        },
        {
          id: "S",
          name: "เบนซิน",
        },
      ],

      user: {
        brandId: "",
        modelCode: "",
        name: "",
        modelYear: "",
        fuel: "",
      },
    };
  },
  methods: {
    logModel() {
      console.log(this.user.brandId);
    },
    handleSubmitForm() {
      // console.log(this.user.brandId.brandId);
      // console.log(this.user.fuel.id);
      let apiURL =
        "https://dms-backend-dev-dxvb7izyka-as.a.run.app/api/vehicle-model/update";
      axios
        .put(apiURL, {
        modelId: this.$route.params.id,
          brandId: this.user.brandId.brandId,
          modelCode: this.user.modelCode,
          name: this.user.name,
          modelYear: this.user.modelYear,
          fuel: this.user.fuel.id,
        })
        .then(() => {
          this.$router.push("/view");
          this.user = {
            brandId: "",
            modelCode: "",
            name: "",
            modelYear: "",
            fuel: "",
          };
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
     showModel() {
    // console.log(this.$route.params);
     axios
      .get(
        "https://dms-backend-dev-dxvb7izyka-as.a.run.app/api/vehicle-model/show",
        {
          params: {
            modelId: this.$route.params.id,
          },
        }
      )
      .then((res) => {
        this.user.brandId = {
            brandId: res.data.data.brandId,
            brandName : res.data.data.brandName
        }
        this.user.modelCode = res.data.data.modelCode ;
        this.user.name = res.data.data.name;
        this.user.modelYear = res.data.data.modelYear;
        this.user.fuel = {
            id: res.data.data.fuel,
            name: res.data.data.fuel == "D" ? "ดีเซล" : "เบนซิน"
        }
      })
      .catch((error) => {
        console.log("TT");
        console.log(error);
      });
  },
  },
  
};
</script>
