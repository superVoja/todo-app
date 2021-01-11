import router from '@/router'

const actions = {
   async login({dispatch}, {valid, user}) {
        if (valid) {
          dispatch("auth/authenticate", {
              strategy: "local",
              ...user,
            },{root:true})
            .then(async() => {
              console.log("Logged in!");
              router.push("/dashboard");
            })
            .catch((e) => {
              console.error("Authenticate error", e);
            });
        }
      },
};
export default{
    namespaced: true,
    actions

}