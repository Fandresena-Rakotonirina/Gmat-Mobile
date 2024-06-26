import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  dropdown: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    maxHeight: 200,
    backgroundColor: 'white',
    elevation: 4,
  },
  noDataText: {
    textAlign: 'center',
    padding: 16,
    fontStyle: 'italic',
  },
  closeIcon: {
    alignSelf: 'flex-end',
    margin: 8,
  },
});
