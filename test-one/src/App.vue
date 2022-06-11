<template>
  <div>
    <nav
      class="
        navbar navbar-dark
        bg-dark
        justify-content-between
        flex-nowarp flex-row
      "
    >
      <div class="container">
        <router-link to="/" class="navbar-brand float-left">CRUD</router-link>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link to="/" class="nav-link p-3">create</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/view" class="nav-link p-3">view</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>