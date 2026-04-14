import { useState, useEffect, useCallback } from 'react';
import { APIError } from '../services/api';

// Generic API hook
export const useApi = (apiFunction, dependencies = [], immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      const apiError = err instanceof APIError ? err : new APIError(err.message);
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, dependencies);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};

// Hook for paginated data
export const usePaginatedApi = (apiFunction, initialParams = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);
  const [pagination, setPagination] = useState(null);

  const execute = useCallback(async (newParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      const finalParams = { ...params, ...newParams };
      const result = await apiFunction(finalParams);
      
      setData(result.data || result);
      if (result.pagination) {
        setPagination(result.pagination);
      }
      
      setParams(finalParams);
      return result;
    } catch (err) {
      const apiError = err instanceof APIError ? err : new APIError(err.message);
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, params]);

  const loadPage = useCallback((page) => {
    return execute({ page });
  }, [execute]);

  const loadNext = useCallback(() => {
    if (pagination && pagination.page < pagination.pages) {
      return loadPage(pagination.page + 1);
    }
  }, [pagination, loadPage]);

  const loadPrevious = useCallback(() => {
    if (pagination && pagination.page > 1) {
      return loadPage(pagination.page - 1);
    }
  }, [pagination, loadPage]);

  const refresh = useCallback(() => {
    return execute();
  }, [execute]);

  useEffect(() => {
    execute();
  }, []);

  return {
    data,
    loading,
    error,
    pagination,
    params,
    execute,
    loadPage,
    loadNext,
    loadPrevious,
    refresh,
    setParams,
  };
};

// Hook for form submissions
export const useFormApi = (apiFunction, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const result = await apiFunction(formData);
      setData(result);
      setSuccess(true);
      return result;
    } catch (err) {
      const apiError = err instanceof APIError ? err : new APIError(err.message);
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
    setLoading(false);
    setSuccess(false);
  }, [initialData]);

  return {
    data,
    loading,
    error,
    success,
    submit,
    reset,
  };
};

// Hook for real-time data (polling)
export const useRealTimeApi = (apiFunction, interval = 5000, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const fetchData = useCallback(async () => {
    if (!isActive) return;
    
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
    } catch (err) {
      const apiError = err instanceof APIError ? err : new APIError(err.message);
      setError(apiError);
    } finally {
      setLoading(false);
    }
  }, [apiFunction, isActive]);

  useEffect(() => {
    if (!isActive) return;

    fetchData();
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [fetchData, interval, isActive, ...dependencies]);

  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    isActive,
    start,
    stop,
    refresh,
  };
};

// Hook for cached data
export const useCachedApi = (apiFunction, cacheKey, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFromCache, setIsFromCache] = useState(false);

  const execute = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      setIsFromCache(false);
      
      const result = await apiFunction(forceRefresh);
      setData(result);
      setIsFromCache(!forceRefresh);
      return result;
    } catch (err) {
      const apiError = err instanceof APIError ? err : new APIError(err.message);
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  useEffect(() => {
    execute();
  }, dependencies);

  const refresh = useCallback(() => {
    return execute(true);
  }, [execute]);

  return {
    data,
    loading,
    error,
    isFromCache,
    execute,
    refresh,
  };
};

// Hook for optimistic updates
export const useOptimisticApi = (apiFunction, initialData = []) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [optimisticData, setOptimisticData] = useState(null);

  const execute = useCallback(async (updateFunction, ...args) => {
    try {
      setLoading(true);
      setError(null);
      
      // Apply optimistic update
      const optimisticResult = updateFunction(data);
      setOptimisticData(optimisticResult);
      
      // Execute actual API call
      const result = await apiFunction(...args);
      
      // Update with real data
      setData(result);
      setOptimisticData(null);
      return result;
    } catch (err) {
      const apiError = err instanceof APIError ? err : new APIError(err.message);
      setError(apiError);
      // Revert optimistic update
      setOptimisticData(null);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, data]);

  const reset = useCallback(() => {
    setData(initialData);
    setOptimisticData(null);
    setError(null);
    setLoading(false);
  }, [initialData]);

  return {
    data: optimisticData || data,
    loading,
    error,
    execute,
    reset,
    isOptimistic: optimisticData !== null,
  };
};

// Hook for debounced API calls
export const useDebouncedApi = (apiFunction, delay = 500) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debouncedValue, setDebouncedValue] = useState(null);

  const execute = useCallback((value) => {
    setDebouncedValue(value);
  }, []);

  useEffect(() => {
    if (!debouncedValue) return;

    const handler = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction(debouncedValue);
        setData(result);
      } catch (err) {
        const apiError = err instanceof APIError ? err : new APIError(err.message);
        setError(apiError);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [debouncedValue, apiFunction, delay]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
    setDebouncedValue(null);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};

export default useApi;
