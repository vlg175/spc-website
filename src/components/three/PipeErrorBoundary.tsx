"use client";

/* ─────────────────────────────────────────────────────────────────────────
   PipeErrorBoundary — catches Three.js / R3F crashes gracefully.
   Renders nothing on error (hero keeps working without the 3D element).
   ───────────────────────────────────────────────────────────────────────── */

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class PipeErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Log but don't crash the page
    console.warn("[PipeScene] 3D render failed, hiding element:", error.message);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
