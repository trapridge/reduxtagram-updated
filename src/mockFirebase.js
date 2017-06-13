export function mockDb() {
  let expectations = []

  const hasNextExpectation = type => 
    expectations.length > 0 && expectations[0].type === type

  const consumeExpectation = () => expectations.splice(0, 1)

  const handlePromiseCallbacks = (resolve, reject, acceptedExpectations, 
      overrideResolveData = null, overrideRejectData = null) => {
    if (hasNextExpectation(acceptedExpectations[0])) {
      const { type, ...rest } = expectations[0]
      resolve(overrideResolveData || rest)
      consumeExpectation()
    } 
    else if (hasNextExpectation(acceptedExpectations[1])) {
      const { type, ...rest } = expectations[0]
      reject(overrideRejectData || rest)
      consumeExpectation()
    }
    else {
      console.error(`Incorrect expectation. Found ${expectations[0]}, 
        but expected one of ${acceptedExpectations}`)
    }
  }

  const handleCallBacks = (type, success, error, acceptedExpectations) => {
    if (hasNextExpectation(acceptedExpectations[0])) {
      const { type, payload, ...rest } = expectations[0]
      success({ val: () => payload, ...rest })
      consumeExpectation()
    }
    else if (hasNextExpectation(acceptedExpectations[1])) {
      const { type, payload, ...rest } = expectations[0]
      error(payload, ...rest)  
      consumeExpectation()
    }
    else {
      console.error(`Incorrect expectation. Found ${expectations[0]}, 
        but expected one of ${acceptedExpectations}`)
    }
  }

  const mockDb = () => {
    const obj = {
      expectPushResolved: (data = {}) => {
        expectations.push({ type: 'PUSH_RESOLVE', ...data })
      },
      expectPushRejected: (data = {}) => {
        expectations.push({ type: 'PUSH_REJECT', ...data })
      },
      expectSetResolved: (data = {}) => {
        expectations.push({ type: 'SET_RESOLVE', ...data })
      },
      expectSetRejected: (data = {}) => {
        expectations.push({ type: 'SET_REJECT', ...data })
      },
      expectRemoveResolved: (data = {}) => {
        expectations.push({ type: 'REMOVE_RESOLVE', ...data })
      },
      expectRemoveRejected: (data = {}) => {
        expectations.push({ type: 'REMOVE_REJECT', ...data })
      },
      expectOff: (data = {}) => {
        expectations.push({ type: 'OFF', ...data })
      },
      expectOnSuccess: (data = {}) => {
        expectations.push({ type: 'ON_SUCCESS', ...data })
      },
      expectOnFailure: (data = {}) => {
        expectations.push({ type: 'ON_FAILURE', ...data })
      },
      expectOnceSuccess: (data = {}) => {
        expectations.push({ type: 'ONCE_SUCCESS', ...data })
      },
      expectOnceFailure: (data = {}) => {
        expectations.push({ type: 'ONCE_FAILURE', ...data })
      },
      clearExpectations: () => { 
        expectations = []
      },
      ref: (path) => {
        return {
          push: () => new Promise((resolve, reject) => {
            const acceptedExpectations = ['PUSH_RESOLVE', 'PUSH_REJECT']
            handlePromiseCallbacks(resolve, reject, acceptedExpectations, {
              set: obj.ref(path).set
            })
          }),
          set: () => new Promise((resolve, reject) => {
            const acceptedExpectations = ['SET_RESOLVE', 'SET_REJECT']
            handlePromiseCallbacks(resolve, reject, acceptedExpectations)
          }),
          remove: () => new Promise((resolve, reject) => {
            const acceptedExpectations = ['REMOVE_RESOLVE', 'REMOVE_REJECT']
            handlePromiseCallbacks(resolve, reject, acceptedExpectations)
          }),
          off: () => {
            if (hasNextExpectation('OFF')) {
              consumeExpectation()
            }
            else {
              console.error(`Incorrect expectation. Found ${expectations[0]}, 
                but expected OFF`)
            }
          },
          on: (type, success, error) => {
            const acceptedExpectations = ['ON_SUCCESS', 'ON_FAILURE']
            handleCallBacks(type, success, error, acceptedExpectations)
          },
          once: (type, success, error) => {
            const acceptedExpectations = ['ONCE_SUCCESS', 'ONCE_FAILURE']
            handleCallBacks(type, success, error, acceptedExpectations)
          },
        }
      }
    }
    return obj
  }
  return mockDb
}
