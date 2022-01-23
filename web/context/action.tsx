export const Action = ({
  setAccount: (dispatch: any, value: string) => {
    dispatch({
      type: 'SET_CURRENT_ACCOUNT',
      payload: {
        currentAccount: value,
      }
    })
  },
  setHasMetamask: (dispatch: any, value: boolean) => {
    dispatch({
      type: 'SET_HAS_METAMASK',
      payload: {
        hasMetamask: value,
      }
    })
  },
  setLoading: (dispatch: any, value: boolean) => {
    dispatch({
      type: 'SET_LOADING',
      payload: {
        loading: value,
      }
    })
  }
})