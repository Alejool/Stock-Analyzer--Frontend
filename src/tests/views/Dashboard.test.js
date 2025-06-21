
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia, setActivePinia } from "pinia";
import Dashboard from "../../views/Dashboard.vue";
import { useDashboardStore } from "../../stores/dashboard";
import { createMockStore } from "../test-utils/setup";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Dashboard },
    { path: "/dashboard", component: Dashboard },
  ],
});

// Mock del store de Dashboard
vi.mock("../../stores/dashboard", () => ({
  useDashboardStore: vi.fn(),
}));

describe("Dashboard View", () => {
  let wrapper;
  let mockDashboardStore;
  let pinia;

  const mockDashboardData = {
    featuredOpportunity: {
      ticker: "AAPL",
      company: "Apple Inc.",
      score: 85,
      targetPrice: 180.5,
      rating: "BUY",
      confidence: 78,
    },
    loading: false,
    error: null,
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    pinia = createPinia();
    setActivePinia(pinia);

    mockDashboardStore = createMockStore({
      ...mockDashboardData,
      fetchFeaturedOpportunity: vi.fn().mockResolvedValue(undefined),
      fetchTopRecommendations: vi.fn().mockResolvedValue(undefined),
    });

    vi.mocked(useDashboardStore).mockReturnValue(mockDashboardStore);

    await router.push("/");
    await router.isReady();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    vi.clearAllMocks();
  });

  it("should render correctly", () => {
    wrapper = mount(Dashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          "router-link": true,
          "router-view": true,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  // Más tests del Dashboard siguiendo el mismo patrón...
});
