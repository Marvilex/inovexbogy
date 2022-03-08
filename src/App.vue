/* eslint-disable vue-eslint-parser/no-unused-vars */

<template>
  <body id="app">
    <header>
      <h1 class="nouserselect buttoncursor selectanimation">Passwords</h1>
      <span class="spacer" />
      <h1
        class="nouserselect buttoncursor selectanimation"
        style="color: #0066ff; font-weight: 400"
      >
        Dashboard
      </h1>
      <div class="buttoncursor">
        <span class="menuburger" /><span class="menuburger" /><span
          class="menuburger"
        />
      </div>
    </header>
    <main>
      <table>
        <thead>
          <tr class="passtr">
            <th>Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="passtr">
            <td>Google</td>
            <td>Harold</td>
            <td>1234</td>
            <td>Harold2</td>
          </tr>
        </tbody>
      </table>
    </main>

    <div>
      <b-button v-b-modal.modal-prevent-closing>+</b-button>

      <div class="mt-3">
        Submitted Names:
        <div v-if="submittedNames.length === 0">--</div>
        <ul v-else class="mb-0 pl-3">
          <li v-for="name in submittedNames" :key="name">{{ name }}</li>
        </ul>
      </div>

      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Submit Your Name"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-input
              id="name-input"
              v-model="name"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </body>
</template>
<script>
import {
  BModal,
  BFormGroup,
  BFormInput,
  BButton,
  VBModal,
} from "bootstrap-vue";

export function getPassword(username, password) {
  let savedpassword = JSON.parse(localStorage.getItem(username))[username];
  savedpassword = savedpassword.loginpassword;
  if (password != savedpassword) return "Password is wrong!";
  localStorage.getItem(username);
}
export function setPassword(
  username,
  password,
  passwordonservice,
  service,
  usernameonservice
) {
  try {
    let savedpassword = JSON.parse(localStorage.getItem(username))[username];
    savedpassword = savedpassword.loginpassword;
    if (password != savedpassword) return "Password is wrong!";
    let jsonstring = JSON.stringify(data);
    let data = JSON.parse(localStorage.getItem(username));
    jsonstring += `,
    {
      "${username}":
      {"servicename":
      {
        "${service}":
         {
           "usernameonservice":${usernameonservice},
           "password":${passwordonservice}
           }
           }
           }, {
            "loginpassword":${password}
           }
           }`;

    localStorage.setItem(username, jsonstring);
  } catch (error) {
    console.log(error.toString());
  }
}

export default {
  name: "App",
  data() {
    return {
      name: "",
      nameState: null,
      submittedNames: [],
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
  components: {
    BModal,
    BFormGroup,
    BFormInput,
    BButton,
  },
  directives: {
    "b-modal": VBModal,
  },
};
</script>
<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

:root {
  --clr-black-1: #23272a;
  --clr-black-2: #2c2f33;
  --clr-white-1: #ffffff;
}

header {
  width: 100%;
  height: 155px;
  background-color: var(--clr-black-1);
  border-bottom: 2px solid var(--clr-white-1);
  display: flex;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
}

.spacer {
  flex: 1;
}
.buttoncursor {
  cursor: pointer;
}
.selectanimation:hover {
  text-decoration: underline;
}
.nouserselect {
  -webkit-user-select: none;
  user-select: none;
}

#app h1 {
  font-size: 2rem;
  margin: 0;
  color: var(--clr-white-1);
  font-weight: 700;
  font-size: 64px;
}

#app {
  min-height: 100vh;
  background: var(--clr-black-2);
  color: var(--clr-white-1);
}

.menuburger {
  width: 82px;
  height: 17px;
  background: var(--clr-white-1);
  position: relative;
  display: block;

  &:not(:last-child) {
    margin-bottom: 6px;
  }
}

table {
  margin-top: 100px;
  width: 600px;
  margin-right: auto;
  margin-left: auto;
}

.passtr {
  border: 1px solid currentColor;
}

.passtr > * {
  margin-right: auto;
  margin-left: auto;
  border-left: 1px solid currentColor;
  border-right: 1px solid currentColor;
}
</style>
