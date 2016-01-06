
<template>
  <div class="login-view">
    <header class="login-header">
      <i></i>
      <p>
        <span>VueAdmin</span>
        <span>0.1.0</span>
        <small>Beta</small>
      </p>
    </header>
    <div id="container">
      <div class="vue-login">
        <validator name="validation">
          <form class="form-horizontal" novalidate @submit.prevent="handleSubmit($validation)">
            <div class="form-group"
              :class="{
                'has-success': $validation.username.valid,
                'has-error': $validation.username.invalid
              }">
              <div class="col-sm-12 col-md-12 col-lg-12">
                <input type="text" class="form-control" v-validate:username="['required']" placeholder="用户名">
                <span class="help-block" v-if="$validation.username.required">请填写用户名</span>
              </div>
            </div>
            <div class="form-group"
              :class="{
                'has-success': $validation.password.valid,
                'has-error': $validation.password.invalid
              }">
              <div class="col-sm-12 col-md-12 col-lg-12">
                <input type="password" class="form-control" v-validate:password="['required']" placeholder="密码">
                <span class="help-block" v-if="$validation.password.required">请填写密码</span>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-12 col-md-12 col-lg-12">
                <button type="submit" class="btn btn-primary">登 录</button>
              </div>
            </div>
          </form>
        </validator>
      </div>
    </div>
  </div>

</template>

<script>

module.exports = {
  
  methods: {
    handleSubmit: function($validation) {
      if ($validation.invalid) {
        return false;
      }
      window.location.href = '/';
    }
  }
}
</script>

