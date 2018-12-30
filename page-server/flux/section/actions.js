export const actionTypes = {
  LOAD_SECTION: 'LOAD_SECTION',
  LOAD_SECTION_SUCCESS: 'LOAD_SECTION_SUCCESS'
}

export const loadSection = path => (
  { type: actionTypes.LOAD_SECTION, path }
)

export const loadSectionSuccess = section => (
  { type: actionTypes.LOAD_SECTION_SUCCESS, section }
)
