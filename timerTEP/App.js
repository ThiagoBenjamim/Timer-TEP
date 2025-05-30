import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function TimerApp() {
  const [mode, setMode] = useState('cronometro');
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('0');
  const [inputSeconds, setInputSeconds] = useState('0');
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (mode === 'temporizador') {
            if (prev <= 0) {
              clearInterval(intervalRef.current);
              setIsRunning(false);
              return 0;
            }
            return prev - 1;
          } else {
            return prev + 1;
          }
        });
      }, 10);
    }
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    if (mode === 'temporizador') {
      const total = parseInt(inputMinutes) * 6000 + parseInt(inputSeconds) * 100;
      setSeconds(total);
    } else {
      setSeconds(0);
    }
  };

  const switchMode = () => {
    pause();
    setMode(mode === 'cronometro' ? 'temporizador' : 'cronometro');
    setSeconds(0);
  };

  const handleSetTime = () => {
    const total = parseInt(inputMinutes) * 6000 + parseInt(inputSeconds) * 100;
    setSeconds(total);
  };

  const formatTime = (s) => {
    const min = Math.floor(s / 6000).toString().padStart(2, '0');
    const sec = Math.floor((s/100) % 60).toString().padStart(2, '0');
    const milisec = (s % 100).toString().padStart(2, '0');
    return `${min}:${sec}.${milisec}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mode === 'cronometro' ? 'Cronômetro' : 'Temporizador'}</Text>

      <Text style={styles.time}>{formatTime(seconds)}</Text>

      <TouchableOpacity onPress={switchMode} style={styles.switchButton}>
        <Text style={styles.buttonText}>
          Mudar para {mode === 'cronometro' ? 'Temporizador' : 'Cronômetro'}
        </Text>
      </TouchableOpacity>

      {mode === 'temporizador' && !isRunning && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={inputMinutes}
            onChangeText={setInputMinutes}
            placeholder="Min"
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={inputSeconds}
            onChangeText={setInputSeconds}
            placeholder="Sec"
          />
          <TouchableOpacity onPress={handleSetTime} style={styles.setButton}>
            <Text style={styles.buttonText}>Definir</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={start} style={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pause} style={styles.button}>
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={reset} style={styles.button}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  time: {
    fontSize: 48,
    color: '#00ff00',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  switchButton: {
    backgroundColor: '#555',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    width: 50,
    height: 40,
    textAlign: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  colon: {
    color: '#fff',
    fontSize: 24,
    marginHorizontal: 5,
  },
  setButton: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
});