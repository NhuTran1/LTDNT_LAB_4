import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Index 0-9: tích cực | 10-14: trung lập | 15-19: tiêu cực
const ANSWERS = [
  'It is certain',
  'It is decidedly so',
  'Without a doubt',
  'Yes definitely',
  'You may rely on it',
  'As I see it, yes',
  'Most likely',
  'Outlook good',
  'Yes',
  'Signs point to yes',
  'Reply hazy, try again',
  'Ask again later',
  'Better not tell you now',
  'Cannot predict now',
  'Concentrate and ask again',
  "Don't count on it",
  'My reply is no',
  'My sources say no',
  'Outlook not so good',
  'Very doubtful',
];

// ============ HÀM THUẦN (pure function, ngoài component) ============
function getAnswerColor(index) {
  if (index < 0) return '#ffffff';
  if (index < 10) return '#4ade80';   // Tích cực - xanh
  if (index < 15) return '#fbbf24';   // Trung lập - vàng
  return '#f87171';                    // Tiêu cực - đỏ
}

export default function App() {
  // ============ STATE DUY NHẤT ============
  const [answerIndex, setAnswerIndex] = useState(-1);

  // ============ DERIVED VALUES (tính lúc render) ============
  const hasAnswer = answerIndex >= 0;
  const answerText = hasAnswer ? ANSWERS[answerIndex] : '';
  const answerColor = getAnswerColor(answerIndex);


  const handleShake = () => {
    const randomIndex = Math.floor(Math.random() * ANSWERS.length);
    setAnswerIndex(randomIndex);
  };

  const handleReset = () => setAnswerIndex(-1);


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        <Text style={styles.title}>MAGIC 8 BALL</Text>

        {/* Quả bóng */}
        <TouchableOpacity
          style={styles.ball}
          onPress={handleShake}
          activeOpacity={0.85}
        >
          <View style={styles.ballInner}>
            <Text style={styles.ballText}>8</Text>
          </View>
        </TouchableOpacity>

        {/* Câu trả lời — conditional rendering */}
        <View style={styles.answerArea}>
          {hasAnswer ? (
            <Text style={[styles.answer, { color: answerColor }]}>
              {answerText}
            </Text>
          ) : (
            <Text style={styles.hint}>Nhấn quả bóng để hỏi</Text>
          )}
        </View>

        {/* Điều khiển */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={handleShake}>
            <Text style={styles.buttonText}>SHAKE</Text>
          </TouchableOpacity>

          {hasAnswer && (
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={handleReset}
            >
              <Text style={styles.buttonText}>RESET</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 4,
    marginBottom: 50,
  },
  ball: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  ballInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#475569',
  },
  ballText: {
    fontSize: 56,
    fontWeight: '900',
    color: '#ffffff',
  },
  answerArea: {
    marginTop: 50,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  hint: {
    fontSize: 16,
    color: '#64748b',
    fontStyle: 'italic',
  },
  answer: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 30,
  },
  controls: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 12,
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonSecondary: {
    backgroundColor: '#334155',
    shadowColor: '#000',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 2,
  },
});