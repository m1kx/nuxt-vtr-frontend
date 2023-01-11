<template>
  <div>
    <NuxtPage />
  </div>
</template>
<style>
body,html {
  background-color: rgb(22, 24, 59);
  color: white;
  font-family: Arial, sans-serif;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}
#header {
  width: 100vw;
  text-align: center;
  padding-top: 30px;
}
#main {
  padding-top: 30px;
  width: 100vw;
}
#login {
  width: 100vw;
  padding-left: calc(25vw - 20px);
  padding-bottom: 20px;
}
#signin {
  width: 50vw;
}
#login-style {
  width: 50vw;
  padding: 20px;
}
#options-main {
  margin-left: calc(25vw - 20px);
  width: 50vw;
  padding: 20px;
  border-radius: 30px;
}
.or, .or:link, .or:visited, .or:active, .or:hover {
  padding-top: 10px;
  color: white;
}
.highlight {
  display: inline-block;
  color: rgb(113, 195, 113);
}
.select {
  margin-top: 7px;
  background-color: rgba(152, 72, 63, 0.454);
  width: calc((50vw - 20px) / 3);
  transition: all 0.1s;
  padding: 0;
}
.valid-check {
  border: 3px solid #942525;
}
.valid-check:valid {
  border: 3px solid #94252500;
  background-color: rgba(66, 113, 63, 0.384);
}
.area {
  border-radius: 30px;
  background-color: rgb(50, 48, 104);
  box-shadow: 
    14px 14px 18px 0 rgba(0, 0, 0, 0.486),
    -10px -10px 14px 0 rgba(255, 255, 255, 0.052);
}
.select:nth-of-type(2), button:nth-of-type(3) {
  margin-left: 10px;
}
.selected {
  border-radius: 15px;
  background-color: rgba(66, 113, 63, 0.384);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

button {
  width: 24.5vw;
  margin-top: 20px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.162);
  border-radius: 6px;
  color: white;
  border: none;
  outline: none;
}
label{
  display: block;
  margin-top: 20px;
  font-size: 18px;
  font-weight: 500;
}
input{
  display: block;
  outline: none;
  height: 30px;
  width: calc(50vw - 15px - 6px);
  letter-spacing: 0.5px;
  background-color: rgba(255, 255, 255, 0.162);
  color: white;
  border-radius: 6px;
  margin-top: 8px;
  font-size: 22px;
  font-weight: 300;
  padding: 10px 0px 10px 15px;
}

@media (max-width: 860px) {
	#main {
    padding-top: 30px;
    width: 100vw;
  }
  #login {
    width: 100vw;
    padding-left: 1vw;
    padding-bottom: 20px;
  }
  #login-style {
    width: calc(98vw - 40px);
    padding: 20px;
  }
  input{
    width: calc(98vw - 55px - 6px);
  }
  #signin {
    width: calc(98vw - 40px);
  }
  .area {
    border-radius: 20px;
  }
  .select {
    width: calc(((98vw - 55px) - 10px) / 3);
  }
  #header {
    padding-top: 0px;
  }
  #main {
    padding-top: 0px;
  }
  h1 {
    font-size: 30px;
  }
}
</style>