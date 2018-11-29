export const actionTypes = {
  ADD_DYNAMIC_PAGE_VALUES: 'ADD_DYNAMIC_PAGE_VALUES'
}

export const addDynamicPageValues = values => (
  { type: actionTypes.ADD_DYNAMIC_PAGE_VALUES, values }
)
