<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h4>View Data</h4>
            <table class="table table-hover">
                <tbody>
                    <tr>
                        <th scope="row"><label>First Name :</label></th>
                        <td><label>{{user.brandID}}</label></td>
                    </tr>
                    <tr>
                        <th scope="row"><label>Last Name :</label></th>
                        <td><label>{{user.lastName}}</label></td>
                    </tr>
                    <tr>
                        <th scope="row"><label>Sex :</label></th>
                        <td><label>{{user.sex}}</label></td>
                    </tr>
                    <tr>
                        <th scope="row"><label>Study :</label></th>
                        <td><label>{{user.birthdate}}</label></td>
                    </tr>
                    <tr>
                        <th scope="row"><label>Email :</label></th>
                        <td><label>{{user.email}}</label></td>
                    </tr>
                                    <tr>
                        <th scope="row"><label>Phone :</label></th>
                        <td><label>{{user.phone}}</label></td>
                    </tr>
                </tbody>
            </table>
            <router-link :to="{name: 'view', params: {id: user._id}}" class="btn btn-primary">
                Back
            </router-link>&nbsp;
            <router-link :to="{name: 'edit', params: {id: user._id}}" class="btn btn-success">
                Edit
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            user: {}
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api/edit-user/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.user = res.data
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:4000/api/update-user/${this.$route.params.id}`;

            axios.put(apiURL, this.user).then((res) => {
                console.log(res);
                this.$router.push('/view')
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>