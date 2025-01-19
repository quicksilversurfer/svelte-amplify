<script lang="ts">
  // State
  let currentDate = $state(new Date());
  let showMobileMenu = $state(false);
  let selectedSlots = $state<Set<string>>(new Set());
  let visibleDays = $state(7); // Default to 7 days on desktop

  // Types
  interface TimeSlot {
    hour: number;
    count: number;
    day: number;
    booked: boolean;
  }

  interface Booking {
    date: Date;
    hour: number;
    userId: string; // In real app would come from auth
  }

  // Sample data - in real app would come from props
  const bookings = $state<TimeSlot[]>([
    { hour: 9, count: 5, day: 1, booked: false },
    { hour: 10, count: 8, day: 1, booked: false },
    { hour: 15, count: 12, day: 3, booked: false },
  ]);

  // Derived values
  const displayDate = $derived(
    currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
      day: "numeric",
    })
  );

  // Calculate visible days based on viewport
  $effect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // sm breakpoint
        visibleDays = 1;
      } else if (window.innerWidth < 1024) {
        // lg breakpoint
        visibleDays = 3;
      } else {
        visibleDays = 7;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const visibleDaysList = $derived(
    Array.from({ length: visibleDays }, (_, i) => {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      return date;
    })
  );

  // Actions
  function previousDay() {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    currentDate = newDate;
  }

  function nextDay() {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    currentDate = newDate;
  }

  function goToToday() {
    currentDate = new Date();
  }

  // Add clear selections function
  function clearSelections() {
    selectedSlots = new Set(); // Create a new Set to trigger reactivity
  }

  // Modify toggleSlotSelection to ensure reactivity
  function toggleSlotSelection(date: Date, hour: number) {
    const key = `${date.toISOString()}_${hour}`;
    const newSelectedSlots = new Set(selectedSlots);

    if (newSelectedSlots.has(key)) {
      newSelectedSlots.delete(key);
    } else {
      newSelectedSlots.add(key);
    }

    selectedSlots = newSelectedSlots; // Assign new Set to trigger reactivity
  }

  async function handleBooking() {
    const bookings: Booking[] = Array.from(selectedSlots).map((key) => {
      const [dateStr, hourStr] = key.split("_");
      return {
        date: new Date(dateStr),
        hour: parseInt(hourStr),
        userId: "current-user-id", // Would come from auth
      };
    });

    // In real app, would make API call here
    console.log("Booking slots:", bookings);
    selectedSlots.clear();
  }

  // Get readable time format
  function formatHour(hour: number): string {
    return new Date(0, 0, 0, hour).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  }

  function isSlotSelected(date: Date, hour: number): boolean {
    return selectedSlots.has(`${date.toISOString()}_${hour}`);
  }
</script>

<!-- Header -->
<div class="flex h-full flex-col">
  <header
    class="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4"
  >
    <h1 class="text-base font-semibold text-gray-900">
      <time datetime={currentDate.toISOString()}>{displayDate}</time>
    </h1>

    <!-- Navigation Controls -->
    <div class="flex items-center gap-2">
      <div
        class="relative flex items-center rounded-md bg-white shadow-xs md:items-stretch"
      >
        <button
          type="button"
          onclick={previousDay}
          class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
        >
          <span class="sr-only">Previous day</span>
          <svg
            class="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <button
          type="button"
          onclick={goToToday}
          class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
        >
          Today
        </button>

        <button
          type="button"
          onclick={nextDay}
          class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
        >
          <span class="sr-only">Next day</span>
          <svg
            class="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- Clear Selections Button -->
      {#if selectedSlots.size > 0}
        <button
          type="button"
          onclick={clearSelections}
          class="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
        >
          Clear Selections
        </button>
      {/if}

      <!-- Book Button -->
      <button
        type="button"
        onclick={handleBooking}
        disabled={selectedSlots.size === 0}
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Book Selected ({selectedSlots.size})
      </button>
    </div>
  </header>

  <!-- Calendar grid -->
  <div class="flex-1 overflow-auto p-4">
    <div
      class="grid gap-1"
      style="grid-template-columns: 4rem repeat({visibleDays}, 1fr)"
    >
      <!-- Time labels -->
      <div class="sticky left-0"></div>
      {#each visibleDaysList as day}
        <div class="text-center text-sm font-medium text-gray-500">
          {day.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
          })}
        </div>
      {/each}

      <!-- Time slots -->
      {#each Array.from({ length: 14 }, (_, i) => i + 8) as hour}
        <div class="text-right pr-2 text-xs text-gray-500 self-center">
          {formatHour(hour)}
        </div>
        {#each visibleDaysList as day}
          {@const booking = bookings.find(
            (b) => b.hour === hour && b.day === new Date(day).getDay()
          )}
          {@const isSelected = isSlotSelected(day, hour)}
          <button
            type="button"
            class="h-12 rounded transition-colors p-1 flex flex-col justify-center w-full {isSelected
              ? 'ring-2 ring-indigo-500 bg-indigo-100 hover:bg-indigo-200'
              : 'hover:ring-2 hover:ring-indigo-500'}"
            style="background-color: {isSelected
              ? 'rgb(224 231 255)'
              : booking
                ? `rgba(79, 70, 229, ${Math.min((booking.count / 15) * 0.5, 0.5)})`
                : 'rgb(243 244 246)'}"
            onclick={() => toggleSlotSelection(day, hour)}
            onkeydown={(e) =>
              e.key === "Enter" && toggleSlotSelection(day, hour)}
            aria-label={`${formatHour(hour)} ${isSelected ? "Selected" : booking ? `${booking.count} bookings` : "Available"}`}
            aria-pressed={isSelected}
          >
            {#if booking}
              <div class="text-xs text-indigo-900 font-medium">
                {booking.count} slots
              </div>
              <div class="text-xs text-indigo-700/75">
                {Math.floor((booking.count / 15) * 100)}% booked
              </div>
            {/if}
          </button>
        {/each}
      {/each}
    </div>
  </div>
</div>

<style>
  /* Any component-specific styles */
</style>
