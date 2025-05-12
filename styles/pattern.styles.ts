import { StyleSheet } from 'react-native';

export const CELL_SIZE = 45;
export const CELL_MARGIN = 2;

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    marginTop: '8%',
    marginHorizontal: '5%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  headerContent: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28, // Reduced from 32
    fontWeight: 'bold',
    color: '#fff',
    flexWrap: 'wrap', // Allow text to wrap
    textAlign: 'center', // Center the text
    paddingHorizontal: 10, // Add some padding on the sides
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    letterSpacing: 0.5,
  },
  controls: {
    padding: 15,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  sizeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  sizeButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sizeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  sizeValue: {
    minWidth: 24,
    textAlign: 'center',
    fontSize: 16,
  },
  sizeInput: {
    width: 70, // Increased from 50 to accommodate larger numbers
    padding: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 90,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButton: {
    backgroundColor: '#3b82f6',
  },
  stopButton: {
    backgroundColor: '#ef4444',
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 90,
    alignItems: 'center',
    backgroundColor: '#6b7280',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    minHeight: '100%',
  },
  fractalContainer: {
    alignItems: 'center',
    transform: [{ scale: 1 }], // Add default scale
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  cellText: {
    fontSize: 20,
    fontWeight: '600',
  },
  footer: {
    padding: 15,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  footerText: {
    fontSize: 14,
    opacity: 0.7,
    letterSpacing: 0.5,
  },
});