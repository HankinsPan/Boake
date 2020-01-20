import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  itemTxt: {
    fontSize: 16,
    color: '#363636',
    lineHeight: 20,
  },
  footerBlock: {
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F',
  },
  headerBlock: {
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#37c',
  },
  emptyBtnView: {
    paddingHorizontal: 25,
    paddingVertical: 7.5,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#cdcdcd',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  emptyIcon: {
    width: width * 0.35,
    height: width * 0.35,
    marginBottom: 10,
  },
  emptyTips: {
    fontSize: 18,
    color: '#d1d1d1',
    marginBottom: 25,
  },
  cell: {
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {
  styles,
};
