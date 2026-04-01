import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, StatusBar, SafeAreaView, Switch, ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── SCREENS ────────────────────────────────────────────────────────────────

function HomeScreen({ todos, darkMode, onToggleDark, onAdd, onDelete, onToggle }) {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  const filtered = todos.filter(t =>
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  const s = styles(darkMode);

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={s.header}>
        <Text style={s.title}>📝 Görevlerim</Text>
        <View style={s.darkToggle}>
          <Text style={s.darkLabel}>{darkMode ? '🌙' : '☀️'}</Text>
          <Switch value={darkMode} onValueChange={onToggleDark} />
        </View>
      </View>

      {/* Search */}
      <TextInput
        style={s.searchInput}
        placeholder="🔍 Ara..."
        placeholderTextColor={darkMode ? '#888' : '#aaa'}
        value={search}
        onChangeText={setSearch}
      />

      {/* Add Input */}
      <View style={s.addRow}>
        <TextInput
          style={s.input}
          placeholder="Yeni görev ekle..."
          placeholderTextColor={darkMode ? '#888' : '#aaa'}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleAdd}
        />
        <TouchableOpacity style={s.addBtn} onPress={handleAdd}>
          <Text style={s.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={s.todoRow}>
            <TouchableOpacity onPress={() => onToggle(item.id)} style={s.todoCheck}>
              <Text style={s.checkIcon}>{item.done ? '✅' : '⬜'}</Text>
            </TouchableOpacity>
            <Text style={[s.todoText, item.done && s.done]}>{item.text}</Text>
            <TouchableOpacity onPress={() => onDelete(item.id)}>
              <Text style={s.deleteBtn}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={s.empty}>Henüz görev yok. Yukarıdan ekle!</Text>
        }
      />
    </SafeAreaView>
  );
}

function StatsScreen({ todos, darkMode }) {
  const total = todos.length;
  const done = todos.filter(t => t.done).length;
  const pending = total - done;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  const s = styles(darkMode);

  return (
    <SafeAreaView style={s.container}>
      <Text style={s.title}>📊 İstatistikler</Text>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={s.statCard}>
          <Text style={s.statNumber}>{total}</Text>
          <Text style={s.statLabel}>Toplam Görev</Text>
        </View>
        <View style={[s.statCard, { backgroundColor: '#4caf50' }]}>
          <Text style={s.statNumber}>{done}</Text>
          <Text style={s.statLabel}>Tamamlanan ✅</Text>
        </View>
        <View style={[s.statCard, { backgroundColor: '#ff9800' }]}>
          <Text style={s.statNumber}>{pending}</Text>
          <Text style={s.statLabel}>Bekleyen ⏳</Text>
        </View>
        <View style={[s.statCard, { backgroundColor: '#2196f3' }]}>
          <Text style={s.statNumber}>{percent}%</Text>
          <Text style={s.statLabel}>Tamamlanma Oranı</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState('home');
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load from AsyncStorage on start
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('todos');
        const dark = await AsyncStorage.getItem('darkMode');
        if (saved) setTodos(JSON.parse(saved));
        if (dark) setDarkMode(JSON.parse(dark));
      } catch (e) {}
    })();
  }, []);

  // Save todos to AsyncStorage on change
  useEffect(() => {
    AsyncStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Save darkMode preference
  useEffect(() => {
    AsyncStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addTodo = (text) => {
    setTodos(prev => [
      { id: Date.now().toString(), text, done: false },
      ...prev,
    ]);
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const s = styles(darkMode);

  return (
    <View style={{ flex: 1 }}>
      {screen === 'home' ? (
        <HomeScreen
          todos={todos}
          darkMode={darkMode}
          onToggleDark={setDarkMode}
          onAdd={addTodo}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
        />
      ) : (
        <StatsScreen todos={todos} darkMode={darkMode} />
      )}

      {/* Bottom Navigation */}
      <View style={s.bottomNav}>
        <TouchableOpacity
          style={[s.navBtn, screen === 'home' && s.navActive]}
          onPress={() => setScreen('home')}
        >
          <Text style={s.navIcon}>🏠</Text>
          <Text style={s.navLabel}>Ana Sayfa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.navBtn, screen === 'stats' && s.navActive]}
          onPress={() => setScreen('stats')}
        >
          <Text style={s.navIcon}>📊</Text>
          <Text style={s.navLabel}>İstatistik</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

const styles = (dark) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dark ? '#1a1a2e' : '#f5f5f5',
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: 20, paddingBottom: 10,
  },
  title: {
    fontSize: 26, fontWeight: 'bold',
    color: dark ? '#e0e0e0' : '#333',
  },
  darkToggle: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  darkLabel: { fontSize: 20 },
  searchInput: {
    margin: 12, marginTop: 4, padding: 12,
    borderRadius: 10, fontSize: 15,
    backgroundColor: dark ? '#16213e' : '#fff',
    color: dark ? '#e0e0e0' : '#333',
    borderWidth: 1, borderColor: dark ? '#333' : '#ddd',
  },
  addRow: {
    flexDirection: 'row', marginHorizontal: 12,
    marginBottom: 10, gap: 8,
  },
  input: {
    flex: 1, padding: 12, borderRadius: 10, fontSize: 15,
    backgroundColor: dark ? '#16213e' : '#fff',
    color: dark ? '#e0e0e0' : '#333',
    borderWidth: 1, borderColor: dark ? '#333' : '#ddd',
  },
  addBtn: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#6c63ff',
    justifyContent: 'center', alignItems: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 28, fontWeight: 'bold', lineHeight: 32 },
  todoRow: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 12, marginBottom: 8,
    padding: 14, borderRadius: 12,
    backgroundColor: dark ? '#16213e' : '#fff',
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 4, elevation: 2,
  },
  todoCheck: { marginRight: 10 },
  checkIcon: { fontSize: 20 },
  todoText: {
    flex: 1, fontSize: 16,
    color: dark ? '#e0e0e0' : '#333',
  },
  done: { textDecorationLine: 'line-through', opacity: 0.5 },
  deleteBtn: { fontSize: 18, marginLeft: 8 },
  empty: {
    textAlign: 'center', marginTop: 60,
    color: dark ? '#555' : '#aaa', fontSize: 16,
  },
  statCard: {
    backgroundColor: '#9c27b0', borderRadius: 16,
    padding: 24, marginBottom: 16, alignItems: 'center',
  },
  statNumber: { fontSize: 48, fontWeight: 'bold', color: '#fff' },
  statLabel: { fontSize: 16, color: '#fff', marginTop: 4 },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: dark ? '#0f3460' : '#fff',
    borderTopWidth: 1, borderTopColor: dark ? '#333' : '#eee',
    paddingBottom: 8,
  },
  navBtn: {
    flex: 1, alignItems: 'center',
    paddingVertical: 10, borderRadius: 8,
  },
  navActive: { backgroundColor: dark ? '#16213e' : '#f0eeff' },
  navIcon: { fontSize: 22 },
  navLabel: {
    fontSize: 12, marginTop: 2,
    color: dark ? '#e0e0e0' : '#555',
  },
});
