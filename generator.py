"""Generate SEO-friendly MDX articles for the Fieldnotes blog."""

from __future__ import annotations

import hashlib
import json
import re
import unicodedata
from datetime import date
from pathlib import Path


CONTENT_DIRECTORY = Path(__file__).resolve().parent / "content"


def slugify(text: str) -> str:
    """Convert text into a lowercase, URL-friendly slug."""
    if not isinstance(text, str):
        raise TypeError("Article title must be a string.")

    normalized = unicodedata.normalize("NFKD", text)
    ascii_text = normalized.encode("ascii", "ignore").decode("ascii")
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", ascii_text).strip("-").lower()

    if slug:
        return slug

    digest = hashlib.sha256(text.encode("utf-8")).hexdigest()[:8]
    return f"article-{digest}"


def _required_text(value: str, field_name: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{field_name} must be a non-empty string.")
    return value.strip()


def _yaml_string(value: str) -> str:
    """Encode a string using JSON quoting, which is valid YAML scalar syntax."""
    return json.dumps(value, ensure_ascii=False)


def create_mdx_article(
    title: str,
    category: str,
    description: str,
    read_time: str,
    body_markdown: str,
) -> Path:
    """Create an MDX article and return the path to the saved file."""
    title = _required_text(title, "Title")
    category = _required_text(category, "Category")
    description = _required_text(description, "Description")
    read_time = _required_text(read_time, "Read time")
    if not isinstance(body_markdown, str):
        raise TypeError("Body markdown must be a string.")

    slug = slugify(title)
    today = date.today().isoformat()
    frontmatter = "\n".join(
        [
            "---",
            f"title: {_yaml_string(title)}",
            f"description: {_yaml_string(description)}",
            f"date: {_yaml_string(today)}",
            f"category: {_yaml_string(category)}",
            f"readTime: {_yaml_string(read_time)}",
            f"slug: {_yaml_string(slug)}",
            "---",
        ]
    )

    body = body_markdown.strip()
    article = (
        f"{frontmatter}\n\n"
        f"{body}\n\n"
        '<AdBanner format="horizontal" />\n\n'
        "## Key Takeaways\n\n"
        "- Choose tools and strategies that fit your goals and available time.\n"
        "- Compare current features, costs, and independent reviews before making a decision.\n"
        "- Start with a small experiment, measure the results, and refine your approach.\n\n"
        "## Affiliate Disclaimer\n\n"
        "This article may contain affiliate links. If you make a purchase through "
        "one of these links, we may earn a commission at no additional cost to you. "
        "Recommendations are provided for informational purposes; please evaluate "
        "products and services for yourself.\n"
    )

    CONTENT_DIRECTORY.mkdir(parents=True, exist_ok=True)
    article_path = CONTENT_DIRECTORY / f"{slug}.mdx"
    try:
        with article_path.open("x", encoding="utf-8", newline="\n") as article_file:
            article_file.write(article)
    except FileExistsError as error:
        raise FileExistsError(
            f"Refusing to overwrite existing article: {article_path}"
        ) from error
    except OSError as error:
        raise OSError(f"Could not write article to {article_path}: {error}") from error

    print(f"Created article: {article_path}")
    return article_path


if __name__ == "__main__":
    sample_articles = [
        {
            "title": "AI Tools for 2026: A Practical Guide to Working Smarter",
            "category": "Technology",
            "description": (
                "Explore practical AI tools for writing, research, and everyday "
                "productivity in 2026, plus a simple framework for choosing the "
                "right tools."
            ),
            "read_time": "7 min read",
            "body_markdown": """# AI Tools for 2026: A Practical Guide

AI tools in 2026 can help with research, drafting, meeting notes, and repetitive
work. The best setup is rarely the one with the most apps; it is the one that
fits your workflow and handles your data responsibly.

## What to look for in an AI tool

- **A clear use case:** Pick a tool that solves a recurring task, such as
  summarizing research or organizing project notes.
- **Privacy controls:** Review data-retention options and avoid sharing
  confidential information unless your organization permits it.
- **Reliable editing:** Treat generated text as a draft. Check facts, sources,
  tone, and details before publishing or sending it.
- **A sustainable price:** Test the free tier or trial before adding another
  recurring subscription.

## A simple way to get started

Choose one repetitive task, record how long it currently takes, and test one
tool for a week. Compare the output quality and time saved, then keep the tool
only if it delivers a clear improvement.""",
        },
        {
            "title": "Digital Side Hustles: How to Choose One That Fits Your Schedule",
            "category": "Personal Finance",
            "description": (
                "Compare realistic digital side hustle ideas, estimate the time "
                "and startup costs, and choose a low-risk way to test demand."
            ),
            "read_time": "6 min read",
            "body_markdown": """# Digital Side Hustles That Fit Real Life

A digital side hustle can make use of skills you already have, but income is
not guaranteed and most ideas take time to validate. Start with a service or
small product that you can test without taking on significant costs.

## Ideas to consider

- **Freelance services:** Offer writing, design, bookkeeping, or virtual
  assistance based on demonstrable skills.
- **Digital downloads:** Create templates, checklists, or learning materials
  for a clearly defined audience.
- **Online tutoring:** Teach a subject or practical skill in scheduled
  sessions, accounting for preparation time.
- **Niche content:** Publish useful resources consistently and explore
  sustainable monetization only after building an audience.

## Validate before investing

Define who the offer helps and what problem it solves. Talk with potential
customers, compare existing alternatives, and run a small test before paying
for software, advertising, or inventory. Track expenses and income separately,
and check local tax and business rules as your activity grows.""",
        },
    ]

    for sample in sample_articles:
        try:
            create_mdx_article(**sample)
        except (OSError, TypeError, ValueError) as error:
            print(f"Error creating {sample['title']!r}: {error}")
