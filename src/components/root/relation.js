export default [
  {
    name: "/",
    path: "/",
    redirect: "/main"
  },
  {
    path: "/main",
    name: "main",
    meta: {
      modules: "main"
    },
    children: [
      {
        path: 'a1',
        name: 'a1',
        meta: {
          modules: 'home'
        }
      }
    ]
  }
];