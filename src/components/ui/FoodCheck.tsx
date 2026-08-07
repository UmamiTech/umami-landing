"use client";

import { useCallback, useEffect, useState } from "react";
import { APP_URL } from "@/lib/app";

/**
 * Human check for the free-trial form.
 *
 * The grid and the prompt come from the app (`GET /api/auth/captcha`); the
 * correct answer never leaves that server, so this component only reports which
 * tiles were tapped. Challenges are single-use — bump `refreshKey` after a
 * failed submit to pull a fresh one.
 *
 * It guards a form that creates a real restaurant in the production database,
 * which is why the trial form has one and the contact form doesn't.
 */

type Tile = { id: number; emoji: string };
type Challenge = { challengeId: string; prompt: string; tiles: Tile[] };

export type FoodCheckValue = { challengeId: string; selected: number[] };

export default function FoodCheck({
  onChange,
  refreshKey = 0,
}: {
  onChange: (value: FoodCheckValue | null) => void;
  refreshKey?: number;
}) {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setFailed(false);
    setSelected([]);
    onChange(null);
    try {
      const res = await fetch(`${APP_URL}/api/auth/captcha`);
      if (!res.ok) throw new Error("captcha unavailable");
      const data: Challenge = await res.json();
      setChallenge(data);
      onChange({ challengeId: data.challengeId, selected: [] });
    } catch {
      setChallenge(null);
      setFailed(true);
    } finally {
      setLoading(false);
    }
    // onChange is a setState wrapper from the parent; re-running on its identity
    // would refetch the challenge on every keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  function toggle(id: number) {
    setSelected((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      if (challenge) onChange({ challengeId: challenge.challengeId, selected: next });
      return next;
    });
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] uppercase tracking-widest font-mono text-brand">
          {challenge ? challenge.prompt : "Quick food check"}
        </span>
        <button
          type="button"
          onClick={load}
          className="text-[11px] font-mono text-muted hover:text-foreground transition-colors"
        >
          ↻ New
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : failed ? (
        <p className="text-xs text-muted py-3 text-center">
          Couldn&rsquo;t load the check.{" "}
          <button
            type="button"
            onClick={load}
            className="text-brand hover:underline"
          >
            Try again
          </button>
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {challenge?.tiles.map((tile) => {
            const isSelected = selected.includes(tile.id);
            return (
              <button
                key={tile.id}
                type="button"
                onClick={() => toggle(tile.id)}
                aria-pressed={isSelected}
                className={`aspect-square rounded-lg text-2xl flex items-center justify-center transition-all active:scale-95 ${
                  isSelected
                    ? "bg-brand/15 border border-brand/50 scale-95"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
              >
                <span aria-hidden="true">{tile.emoji}</span>
              </button>
            );
          })}
        </div>
      )}

      <p className="text-[11px] text-muted mt-2">
        Tap every match, then continue.
      </p>
    </div>
  );
}
