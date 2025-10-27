#!/bin/bash

echo "VibeFoxes - test CI locally"
echo ""
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

ERRORS=0

success()
{
    echo -e "${GREEN}$1${NC}"
}

error()
{
    echo -e "${RED}$1${NC}"
    ERRORS=$((ERRORS + 1))
}

warning()
{
    echo -e "${YELLOW}$1${NC}"
}

info()
{
    echo "$1"
}

echo "Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    success "Node.js installed: $NODE_VERSION"
else
    error "Node.js is not installed"
fi
echo ""

echo "Checking file structure..."
if [ -f "index.js" ]; then
    success "index.js found"
else
    error "index.js not found"
fi

if [ -f "server.js" ]; then
    success "server.js found"
else
    warning "server.js not found"
fi

if [ -f "package.json" ]; then
    success "package.json found"
else
    error "package.json not found"
fi

if [ -f "index.html" ]; then
    success "index.html found"
else
    info "index.html not found (using document.write)"
fi
echo ""

echo "Syntax validation..."
if node --check index.js 2>/dev/null; then
    success "index.js syntax OK"
else
    error "index.js has syntax errors"
fi

if [ -f "server.js" ]; then
    if node --check server.js 2>/dev/null; then
        success "server.js syntax OK"
    else
        error "server.js has syntax errors"
    fi
fi
echo ""

echo "Checking for hardcoded secrets..."
if grep -r "sk-[a-zA-Z0-9]\{20,\}" *.js 2>/dev/null; then
    error "Potential API key found in code!"
else
    success "No hardcoded API keys detected"
fi
echo ""

echo "Checking file sizes..."
if [ -f "index.js" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        FILE_SIZE=$(stat -f%z index.js)
    else
        FILE_SIZE=$(stat -c%s index.js)
    fi
    if [ $FILE_SIZE -gt 500000 ]; then
        warning "index.js is larger than 500KB ($FILE_SIZE bytes)"
    else
        success "File size OK: $FILE_SIZE bytes"
    fi
fi
echo ""

echo "Security check (eval usage)..."
if grep -q "eval(" index.js; then
    warning "eval() usage detected - potential security risk"
else
    success "No eval() usage detected"
fi
echo ""

echo "Checking PUTER_AVAILABLE configuration..."
if grep -q "const PUTER_AVAILABLE = true" index.js; then
    info "PUTER_AVAILABLE = true (local testing mode)"
fi
if [ -f "server.js" ] && grep -q "const PUTER_AVAILABLE = false" server.js; then
    info "PUTER_AVAILABLE = false (Ancient Brain mode)"
fi
echo ""

echo "Running npm checks..."
if [ -f "package.json" ]; then
    if command -v npm &> /dev/null; then
        info "Installing dependencies..."
        npm install --silent 2>/dev/null
        info "Running npm test..."
        if npm test 2>/dev/null; then
            success "npm test passed"
        else
            error "npm test failed"
        fi
    else
        warning "npm not installed, skipping npm checks"
    fi
fi
echo ""
echo "Test Summary:"

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}All checks passed!${NC}"
    exit 0
else
    echo -e "${RED}$ERRORS error(s) found. Please fix them before deploying.${NC}"
    exit 1
fi
