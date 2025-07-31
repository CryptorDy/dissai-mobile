import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { WebView } from 'react-native-webview';

/**
 * Главная страница приложения с WebView
 * Отображает веб-страницу на полный экран с лоадером и обработкой ошибок
 */
const HomePage: React.FC = () => {
  // Состояние для отслеживания загрузки
  const [isLoading, setIsLoading] = useState(true);
  // Состояние для отслеживания ошибок
  const [hasError, setHasError] = useState(false);
  // Состояние для хранения текста ошибки
  const [errorMessage, setErrorMessage] = useState('');

  // URL для загрузки (используем Google для тестирования)
  const webViewUrl = 'https://dissai.io/auth/login';

  /**
   * Обработчик начала загрузки страницы
   */
  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage('');
  };

  /**
   * Обработчик завершения загрузки страницы
   */
  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  /**
   * Обработчик ошибок загрузки
   */
  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    setIsLoading(false);
    setHasError(true);
    setErrorMessage(nativeEvent.description || 'Произошла ошибка при загрузке страницы');
  };

  /**
   * Функция для повторной попытки загрузки
   */
  const handleRetry = () => {
    setHasError(false);
    setErrorMessage('');
    setIsLoading(true);
  };

  return (
    <View style={styles.container}>
      {/* Скрываем статус бар для полноэкранного режима */}
      <StatusBar hidden={true} />
      
      {/* WebView компонент на весь экран */}
      <WebView
        source={{ uri: webViewUrl }}
        style={styles.webview}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        // Дополнительные настройки для лучшей производительности
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        // Обработка навигации
        onNavigationStateChange={(navState) => {
          // Можно добавить логику для отслеживания навигации
          console.log('Navigation state changed:', navState.url);
        }}
      />

      {/* Лоадер поверх WebView */}
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loaderText}>Загрузка...</Text>
        </View>
      )}

      {/* Экран ошибки */}
      {hasError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Ошибка загрузки</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Повторить</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Стили для компонента
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Черный фон для устранения белых полос
  },
  webview: {
    flex: 1,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Темный фон для лоадера
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#ffffff', // Белый текст на темном фоне
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000', // Темный фон для экрана ошибки
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: '#ffffff', // Белый текст на темном фоне
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomePage; 