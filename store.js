const store = module.exports = (function() {

  let listeners = []

  /**
   * Immutable states
   */
  const state = {
  }
  
  /**
   * Getters
   */
  const getters = {
  }
  
  /**
   * Mutations
   */
  const mutations = {
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
    for (let i=0; i < listeners.length; i++) listeners[i](mutation, params);
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