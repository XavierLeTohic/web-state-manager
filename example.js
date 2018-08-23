const store = (function() {

  let listeners = []

  const state = {
    firstname: 'John',
    lastname: 'Wayne',
    age: 23
  }
  

  const getters = {
    get fullName() {
      return `${state.firstname} ${state.lastname}`
    },
    get age() {
      return `${state.age} years old`
    }
  }
  

  const mutations = {
    setFirstname: firstname => state.firstname = firstname,
    incrementAge: () => state.age += 1
  }
  
  /**
   * Will call the related mutation
   * @param {string} mutation 
   * @param {object|string} params 
   */
  const dispatch = (mutation, params = {}) => {
  
    // Check if the mutation exist
    if(typeof mutations[mutation] === 'undefined') {
      throw new Error(`Mutation ${mutation} do not exist`)
    }
  
    // Call the related mutation
    mutations[mutation](params);
  
    // Call all listeners
    for (let i = 0; i < listeners.length; i++) {
      listeners[i](mutation, params)
    }
  };
  
  /**
   * Subscribe to all mutations
   * @param {event} listener 
   */
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => { 
      unsubscribe(listener); 
    };
  }
  
  /**
   * Unsubscribe to all mutations
   * @param {event} listener 
   */
  const unsubscribe = (listener) => {
    listeners = listeners.filter((l => {
      if(l === listener) {
        listener = null // To CG
        return false
      }
  
      return true
    }))
  }
  
  return {
    getters,
    dispatch,
    subscribe,
    unsubscribe
  }
}())

const { getters, dispatch, subscribe } = store;

console.log(`Fullname and age getters : ${getters.fullName}, ${getters.age}`)

const unsubscribe = subscribe((mutation) => {
  console.log(`Mutation "${mutation}" called`)
})

console.log('Suscribed to mutations changes')

dispatch('setFirstname', 'Bruce')

console.log(`New fullname : ${getters.fullName}`)

dispatch('incrementAge')

unsubscribe()

// As we unsubscribed we should not see a log
dispatch('setFirstname', 'Mike')